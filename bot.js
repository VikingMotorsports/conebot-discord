const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    codeBlock,
    ChannelType,
    Events,
    ActivityType,
    MessageFlags,
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
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
    'emails.json',
    'phones.json',
    'links.json',
];

// check files
(async () => {
    await checkRequiredFiles();
})();
// register cronjobs
require('./cron.js')(bot);

bot.commands = new Collection();

const foldersPath = path.join(__dirname, 'cmds');
const directory = fs.readdirSync(foldersPath, { withFileTypes: true });

for (const entry of directory) {
    if (entry.isDirectory()) {
        const commandsPath = path.join(foldersPath, entry.name);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            bot.commands.set(command.data.name, command);
        }
    }
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

    //* ignores messages made by bots
    if (message.author.bot) return;
    //* ignores messages outside of channels
    if (message.channel.type === ChannelType.DM) return;
    //* ignores messages in announcements
    if (message.channel.id === config.announcementsChannel) return;
    //* ignores messages with code blocks
    if (message.content.includes('\`')) return;

    const args = message.content.toLowerCase().split(/ +/);
    const commandName = args.shift();

    if (commandName.startsWith(config.prefix)) {
        //* dynamic command handler
        if (commandName[1] === config.prefix || !commandName[1]) return;
        const cmds = commandName.slice(config.prefix.length);
        const command =
            bot.commands.get(cmds) ?? // map.get returns undefined if not found
            bot.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(cmds)
            );
        if (!command) {
            return;
        }
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
            message.channel.send('There was an error executing that command.');
        }
    } else {
        replies(bot, message);
    }
});

bot.on(Events.InteractionCreate, async (interaction) => {
    if (
        interaction.isChatInputCommand() &&
        bot.commands.has(interaction.commandName)
    ) {
        commandInteractionHandler(interaction);
    } else if (interaction.isButton() && interaction.customId === 'join') {
        joinButtonHandler(interaction);
    } else if (interaction.isContextMenuCommand()) {
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
