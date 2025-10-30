const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    codeBlock,
    ChannelType,
    InteractionType,
    Events,
    ActivityType,
    MessageFlags,
} = require('discord.js');
const fs = require('node:fs');
const config = require('./config.json');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
    ],
    allowedMentions: {
        parse: ['roles', 'everyone', 'users'],
        repliedUser: true,
    },
});

const requiredFiles = [
    'config.json',
    'credentials.json',
    'emails.json',
    'links.json',
    'phones.json',
    'polls.json',
    'soda.json',
    'token.json',
];

// register cronjobs
require('./cron.js')(bot);

bot.commands = new Collection();
// bot.polls = require('./polls.json');

const commandFiles = fs
    .readdirSync('./cmds')
    .filter((file) => file.endsWith('.js'));
//const commandCache = require('./slashCommands.json');

// WARN: commented because unused
//const poll = require('./cmds/poll');

// checkRequiredFiles();

for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    bot.commands.set(command.data.name, command);
}

bot.login(config.token);

bot.once(Events.ClientReady, (bot) => {
    console.log(`Bot online as ${bot.user.tag} in ${bot.guilds.cache.first()}`);
    bot.user.setActivity('your every move', {
        type: ActivityType.Watching,
    }); //* sets what the bot is playing

    console.assert(
        bot.channels.cache.get(config.rulesChannel) !== undefined,
        'rules channel not set'
    );
});

bot.on(Events.MessageCreate, async (message) => {
    //* message-based replies
    const replies = require('./messageReplies');

    //*  ignores messages made by bots
    if (message.author.bot) return;
    //* ignores messages outside of channels
    if (message.channel.type === ChannelType.DM) return;
    //* ignores messages in announcements
    if (message.channel.id === config.announcementsChannel) return;
    //* ignores messages with code blocks
    if (message.content.includes('\`')) return;

    const args = message.content.toLowerCase().split(/ +/);
    const commandName = args.shift();

    if (message.content.startsWith('?test')) {
        testCommand();
    } else if (commandName.startsWith(config.prefix)) {
        //* dynamic command handler
        if (commandName[1] === config.prefix || !commandName[1]) return;
        const cmds = commandName.slice(config.prefix.length);
        const command =
            bot.commands.get(cmds) ?? // map.get returns undefined if not found
            bot.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(cmds)
            );
        try {
            if (command.args && !args.length) {
                await message.channel.send(
                    'You need to provide arguments for that command.'
                );
            } else {
                const reply = await command.execute(bot, message, args);
                await message.channel.send(reply);
            }
        } catch (error) {
            console.error(error);
            await message.channel.send(
                'There was an error executing that command.'
            );
            await bot.guilds.cache
                .first()
                .members.cache.get(config.botOwner)
                .send(`General error:\n\n${error}`);
        }
    } else {
        replies(bot, message);
    }
});

bot.on(Events.InteractionCreate, async (interaction) => {
    if (
        interaction.isChatInputCommand() &&
        bot.commands.has(interaction.commandName)
    )
        commandInteractionHandler(interaction);
    if (
        interaction.isStringSelectMenu() &&
        interaction.customId === 'poll-options'
    )
        pollSelectMenuHandler(interaction);
    if (interaction.isButton() && interaction.customId === 'join')
        joinButtonHandler(interaction);
    if (interaction.isContextMenuCommand()) {
        if (
            interaction.commandName !== 'Get Email Address' &&
            interaction.commandName !== 'Get Phone Number'
        )
            interaction.reply({
                content: 'Error executing command',
                flags: MessageFlags.Ephemeral,
            });
        if (interaction.commandName === 'Get Email Address') {
            try {
                await bot.commands.get('email').interact(interaction);
            } catch (error) {
                console.error(error);
                if (!interaction.replied)
                    interaction.reply({
                        content: `Error executing command:\n${codeBlock(error)}`,
                        flags: MessageFlags.Ephemeral,
                    });
            }
        }
        if (interaction.commandName === 'Get Phone Number') {
            try {
                await bot.commands.get('phone').interact(interaction);
            } catch (error) {
                console.error(error);
                if (!interaction.replied)
                    interaction.reply({
                        content: `Error executing command:\n${codeBlock(error)}`,
                        flags: MessageFlags.Ephemeral,
                    });
            }
        }
    }
});

async function findEmoji(emojiName) {
    const emoji = await bot.emojis.cache.find(
        (emote) => emote.name === emojiName
    );
    return emoji;
}

async function checkRequiredFiles() {
    for (f of requiredFiles) {
        try {
            await fs.promises.access(`./${f}`, fs.constants.F_OK);
            console.log(`${f} exists`);
        } catch (error) {
            fs.writeFile(`./${f}`, JSON.stringify({}), (err) => {
                if (err) console.error(err);
            });
            console.log(`${f} created`);
            continue;
        }
    }
}

async function commandInteractionHandler(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} found.`);
        return;
    }
    try {
        await command.interact(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
}

async function pollSelectMenuHandler(interaction) {
    const option = interaction.values;
    const messageId = interaction.message.id;
    const user = interaction.user.id;
    try {
        const reply = await bot.commands
            .get('poll')
            .cast(messageId, option, user);
        interaction.reply(reply);
    } catch (error) {
        console.error(error);
        if (!interaction.replied)
            await interaction.reply({
                content: `Error executing command:\n${codeBlock('js', error)}`,
                flags: MessageFlags.Ephemeral,
            });
    }
}

async function joinButtonHandler(interaction) {
    try {
        const isMember = interaction.member.roles.cache.find(
            (r) => r.name === 'Member'
        );
        if (isMember)
            return interaction.reply({
                content: 'You are already a member.',
                flags: MessageFlags.Ephemeral,
            });
        const role = interaction.guild.roles.cache.find(
            (r) => r.name === 'Member'
        );
        interaction.member.roles.add(role);
        interaction.reply({
            content: 'You are now a Viking Motorsports member. Welcome!',
            flags: MessageFlags.Ephemeral,
        });
    } catch (error) {
        console.error(error);
        if (!interaction.replied)
            await interaction.reply({
                content: `Error executing command:\n${codeBlock('js', error)}`,
                flags: MessageFlags.Ephemeral,
            });
    }
}

async function setCommandPermissions() {
    bot.application.fetch();
    const index = commandCache.map((c) => c.name).indexOf('update');
    if (index === -1) return;
    const updateCommand = await bot.guilds.cache
        .get(config.guildID)
        .commands.fetch(commandCache[index].id);
    const permissions = [
        {
            id: config.leadershipRoleId,
            type: 'ROLE',
            permission: true,
        },
    ];
    await updateCommand.permissions.add({ permissions });
}

async function testCommand() {
    const data = fs.readFileSync('./config.json');
    const competition = new Date(JSON.parse(data).competition);

    if (Date.now() > competition) return;

    const days = Math.ceil((competition.getTime() - Date.now()) / 8.64e7);
    if (days > 60) return;

    // console.log(days);

    try {
        bot.channels.cache
            .get('644810281611952130')
            .send(
                `competition: ${competition}\ndate now: ${Date.now()}\n${days} days until competition.`
            );
    } catch (error) {
        console.error(error);
    }
}

async function createInvite(client) {
    try {
        const invite = await client.generateInvite([
            'ADD_REACTIONS',
            'SEND_MESSAGES',
            'VIEW_CHANNEL',
            'EMBED_LINKS',
            'ATTACH_FILES',
            'READ_MESSAGE_HISTORY',
            'CONNECT',
            'SPEAK',
            'CHANGE_NICKNAME',
            'MANAGE_ROLES',
            'MANAGE_EMOJIS',
        ]);
        console.log(invite);
    } catch (error) {
        console.log(error);
    }
    const reactMessage = await bot.channels.cache
        .get(config.rulesChannel)
        .messages.fetch(config.reactMsg); // caches reaction message
    reactMessage.react('✅');
    await setCommandPermissions();
}
