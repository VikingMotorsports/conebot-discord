const { Client, Intents, Collection } = require('discord.js');
// const {Client, GatewayIntentBits, Collection, Partials, codeBlock, InteractionType} = require('discord.js');
const { codeBlock } = require('@discordjs/builders')
const config = require('./config.json');
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    // intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageReactions],
    allowedMentions: { parse: ['roles', 'everyone', 'users'], repliedUser: true }
});
const fs = require('fs');
const cron = require('node-cron');
const requiredFiles = ['config.json', 'credentials.json', 'emails.json', 'links.json', 'phones.json', 'polls.json', 'soda.json', 'token.json'];

//TODO for Google API token refresh
const axios = require('axios');
const CREDENTIALS_PATH = './credentials.json';
const TOKEN_PATH = './token.json';

bot.commands = new Collection();
// bot.polls = require('./polls.json');

const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const commandCache = require('./slashCommands.json');
const poll = require('./cmds/poll');

// checkRequiredFiles();

for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    bot.commands.set(command.data.name, command);
}

bot.login(config.token);

cron.schedule('0 9 * * *', async () => {
    // const data = await fs.promises.readFile('./config.json');
    const data = fs.readFileSync('./config.json')
    const competition = new Date(JSON.parse(data).competition);

    if (Date.now() > competition) return;

    const days = Math.ceil((competition.getTime() - Date.now()) / 8.64e+7);
    if (days > 60) return;

    console.log(days);

    try {
        bot.channels.cache.get(config.announcementsChannel).send(`${days} days until competition.`);
    } catch (error) {
        console.error(error);
    }
});

cron.schedule('* * * * *', async () => {
    const pollData = JSON.parse(fs.readFileSync('./polls.json', 'utf-8'))
    for (let i in pollData) {
        if (!pollData.hasOwnProperty(i)) continue
        const time = pollData[i].time

        if (Date.now() > time) {
            try {
                const question = pollData[i].question
                const votes = pollData[i].votes
                await bot.commands.get('poll').result(bot, question, votes)
                delete pollData[i]

                fs.writeFile('./polls.json', JSON.stringify(pollData, null, '\t'), err => { if (err) return console.error(err) })
            } catch (error) {
                console.error(error)
            }
        }
    }
})

cron.schedule('0 0 * * 0', async () => {
    const tokenBuffer = await fs.promises.readFile(TOKEN_PATH);
    const tokenContent = JSON.parse(tokenBuffer);
    const refreshToken = tokenContent.refresh_token;
    const currentExpiration = token.expiry_date;

    if (currentExpiration < Date.now()) {
        const credentialsBuffer = await fs.promises.readFile(CREDENTIALS_PATH);
        const credentials = JSON.parse(credentialsBuffer);
        const clientID = credentials.installed.client_id;
        const clientSecret = credentials.installed.client_secret;

        try {
            const response = await axios({
                method: 'post',
                url: 'https://oauth2.googleapis.com/token',
                headers: {
                    'Content-Type': 'application-json'
                },
                data: {
                    'client_id': clientID,
                    'client_secret': clientSecret,
                    'refresh_token': refreshToken,
                    'grant-type': 'refresh_token'
                }
            });

            tokenContent['access_token'] = response.data.access_token;
            tokenContent['expiry_date'] = Date.now() + (response.data.expires_in * 1000);

            fs.writeFile(TOKEN_PATH, JSON.stringify(tokenContent, null, '\t'), err => {
                if (err) console.error(err);
                console.log('Google API token refreshed');
            });
        } catch (error) {
            console.error(error);
        }
    }
})

bot.on('ready', async () => {
    console.log(`Bot online as ${bot.user.username} in ${bot.guilds.cache.first()}`);
    bot.user.setActivity('your every move', {
        type: 'WATCHING'
    }); //* sets what the bot is playing

    bot.channels.cache.get(config.rulesChannel)

    //* script for creating an invite link for the bot, uncomment to add bot to another server
    // try {
    //     const invite = await bot.generateInvite(['ADD_REACTIONS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'CHANGE_NICKNAME', 'MANAGE_ROLES', 'MANAGE_EMOJIS']);
    //     console.log(invite);
    // } catch (error) {
    //     console.log(error);
    // }
    // const reactMessage = await bot.channels.cache.get(config.rulesChannel).messages.fetch(config.reactMsg); // caches reaction message
    // reactMessage.react('✅');
    // await setCommandPermissions()
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (!user) return;
    if (user.bot) return;
    if (!reaction.message.channel.guild) return;
    if (reaction.emoji.name === '✅' && reaction.message.id === config.reactMsg) {
        const role = reaction.message.guild.roles.cache.find(r => r.name === 'Member');
        try {
            reaction.message.guild.member(user).roles.add(role);
        } catch (error) {
            console.error(error);
        }
    }
});

bot.on('messageReactionRemove', (reaction, user) => {
    if (!user) return;
    if (user.bot) return;
    if (!reaction.message.channel.guild) return;
    if (reaction.emoji.name === '✅' && reaction.message.id === config.reactMsg) {
        const role = reaction.message.guild.roles.cache.find(r => r.name === 'Member');
        try {
            reaction.message.guild.member(user).roles.remove(role);
        } catch (error) {
            console.error(error);
        }
    }
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return; //*  ignores messages made by bots
    if (message.channel.type === ('dm' || 'group')) return; //* ignores messages outside of channels
    if (message.channel.id === config.announcementsChannel) return; //* ignores messages in announcements
    if (message.content.includes('\`')) return; //* ignores messages with code blocks

    const args = message.content.toLowerCase().split(/ +/);
    const commandName = args.shift();

    if (message.content.toLowerCase().includes('hello')) {
        const blobwave = await findEmoji("blobwave");
        message.channel.send(`Hi! ${blobwave}`);
    }
    if (message.content.toLowerCase().includes('sticky liquid' || 'sticky juice')) {
        message.react('💦');
    }
    if (message.author.id === '216771586651455492' && (message.content.toLowerCase().includes('vodka') || message.content.toLowerCase().includes('russian water') || message.content.toLowerCase().includes('slav') || message.content.toLowerCase().includes('whiskey'))) {
        const blyat = await findEmoji('blyat');
        message.react(blyat);
    }
    if (message.content.toLowerCase().includes('good night') || message.content.toLowerCase().includes('gnight') || message.content.toLowerCase().includes('good morning') || message.content.toLowerCase().includes('good afternoon')) {
        try {
            const reply = await bot.commands.get('greeting').execute(bot, message, args);
            message.channel.send(reply);
        } catch (error) {
            console.error(error);
        }
    }
    if (message.content.toLowerCase().includes('heads or tails')) {
        try {
            const reply = await bot.commands.get('cointoss').execute(bot, message, args);
            message.channel.send(reply);
        } catch (error) {
            console.error(error);
        }
    }
    if (message.content.toLowerCase().includes('blyat')) {
        const blyat = await findEmoji('blyat');
        message.react(blyat);
    }
    if (message.content.toLowerCase().includes('good bot')) {
        message.react('🤗');
        message.channel.send(`Thank you, ${message.member.nickname || message.author.username}!`);
    }
    if (message.content.toLowerCase().includes('bad bot') || message.content.toLowerCase().includes('fuck you bot') || message.content.toLowerCase().includes('fuck you, bot')) {
        message.react('🖕');
        let diss = ['no u 😠', '😤', 'fite me', '😢'];
        let saydiss = diss[Math.floor(Math.random() * diss.length)];
        message.channel.send(saydiss);
    }
    if (message.content.toLowerCase().includes('cone') && (message.content.toLowerCase().includes('avoid') || message.content.toLowerCase().includes('mind') || message.content.toLowerCase().includes('watch out'))) {
        const cone = await findEmoji('cone');
        message.react(cone);
    }
    if (message.content.toLowerCase().includes('ducttape') || message.content.toLowerCase().includes('duct tape')) {
        const ducttape = await findEmoji('ducttape');
        message.react(ducttape);
    }
    if (message.content.toLowerCase().match(/ye{2,}t/)) {
        const yeet = await findEmoji('yeet');
        message.react(yeet);
    }
    if (message.content.toLowerCase().includes('send it') || message.content.toLowerCase().includes('sent it')) {
        const send = await findEmoji('sendit');
        message.react(send);
    }
    if (message.content.toLowerCase().includes('euro')) {
        message.react('🇪🇺');
    }
    if (message.content.toLowerCase().includes('doubt')) {
        const doubt = await findEmoji('doubt');
        message.react(doubt);
    }
    if (message.author.id === '216771586651455492' && message.content.toLowerCase().includes('user error')) {
        message.channel.send('https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif');
    }
    if (message.content.toLowerCase().includes('unbelievable')) {
        message.channel.send('http://gfycat.com/MadUnfinishedDarklingbeetle');
    }
    if (message.content.toLowerCase().includes('sentient')) {
        message.react('👀');
        message.channel.send('https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy.gif');
    }
    if (message.content.toLowerCase().includes('shoey')) {
        message.channel.send('https://tenor.com/view/daniel-ricciardo-honey-badger-dr3-shoey-f1-gif-12688182');
    }
    if (message.content.toLowerCase().includes(' ass ') && (message.content.toLowerCase().includes('wrc') || message.content.toLowerCase().includes('rally') || message.content.toLowerCase().includes('timo'))) {
        message.channel.send('https://youtu.be/JleS4BdTGlo?t=17');
    }
    if (message.content.toLowerCase().includes('!salty')) {
        message.channel.send('https://streamable.com/6t08o');
    }
    if (message.content.toLowerCase().includes('they had us') || message.content.toLowerCase().includes('first half')) {
        message.channel.send('https://i.imgur.com/QpnBp7G.jpg');
    }
    if (message.content.toLowerCase().includes('shitshow') || message.content.toLowerCase().includes('shit show')) {
        message.channel.send('https://streamable.com/dvvsd5');
    }
    if (message.content.toLowerCase().includes('fucking idiot')) {
        message.channel.send('https://www.youtube.com/watch?v=stb0sqtwAZA');
    }
    if (message.content.toLowerCase().includes('monza') || message.content.toLowerCase().includes('orgasm')) {
        message.channel.send('https://www.youtube.com/watch?v=DJ1EZOvLJcI');
    }
    if (message.content.toLowerCase().includes('how cute')) {
        message.channel.send('https://i.imgur.com/Dvi8rwG.jpg');
    }
    if (message.content.toLowerCase().includes('oh deer') || message.content.toLowerCase().includes('oh dear')) {
        message.channel.send('https://www.youtube.com/watch?v=VaU6pqhwur4');
    }
    if (message.content.toLowerCase().includes('can\'t believe you\'ve done this') || message.content.toLowerCase().includes('cant believe youve done this') || message.content.toLowerCase().includes('can\'t believe it') || message.content.toLowerCase().includes('cant believe it')) {
        message.channel.send('https://youtu.be/O7lRV1VHv1g?t=3');
    }
    if (message.content.startsWith('?test')) {
        testCommand()
    }
    if (commandName.startsWith(config.prefix)) { //* dynamic command handler
        if (commandName[1] === config.prefix || !commandName[1]) return;
        const cmds = commandName.slice(config.prefix.length);
        const command = bot.commands.get(cmds) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmds));
        try {
            if (command.args && !args.length) {
                message.channel.send('You need to provide arguments for that command.');
            } else {
                const reply = await command.execute(bot, message, args);
                message.channel.send(reply);
            }
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error executing that command.');
            bot.guilds.cache.first().members.cache.get(config.botOwner).send(`General error:\n\n${error}`);
        }
    }
});

bot.on('interactionCreate', interaction => {
    if (interaction.isCommand() && bot.commands.has(interaction.commandName)) commandInteractionHandler(interaction);
    if (interaction.isSelectMenu() && interaction.customId === 'poll-options') pollSelectMenuHandler(interaction);
    if (interaction.isButton() && interaction.customId === 'join') joinButtonHandler(interaction);
    if (interaction.isContextMenu()) {
        if (interaction.commandName !== 'Get Email Address' || interaction.commandName !== 'Get Phone Number') interaction.reply({ content: 'Error executing command', ephemeral: true })
        if (interaction.commandName === 'Get Email Address') {
            try {
                bot.commands.get('email').interact(interaction);
            } catch (error) {
                console.error(error)
                if (!interaction.replied) interaction.reply({ content: `Error executing command:\n${codeBlock(error)}`, ephemeral: true })
            }
        }
        if (interaction.commandName === 'Get Phone Number') {
            try {
                bot.commands.get('phone').interact(interaction)
            } catch (error) {
                console.error(error)
                if (!interaction.replied) interaction.reply({ content: `Error executing command:\n${codeBlock(error)}`, ephemeral: true })
            }
        }
    }
});

async function findEmoji(emojiName) {
    const emoji = await bot.emojis.cache.find(emote => emote.name === emojiName);
    return emoji;
}

async function checkRequiredFiles() {
    for (f of requiredFiles) {
        try {
            await fs.promises.access(`./${f}`, fs.constants.F_OK)
            console.log(`${f} exists`);
        } catch (error) {
            fs.writeFile(`./${f}`, JSON.stringify({}), err => {
                if (err) console.error(err)
            });
            console.log(`${f} created`);
            continue;
        }
    }
}

async function commandInteractionHandler(interaction) {
    try {
        await bot.commands.get(interaction.commandName).interact(interaction);
    } catch (error) {
        console.error(error);
        if (!interaction.replied) await interaction.reply({ content: 'Error executing command', ephemeral: true });
    }
}

async function pollSelectMenuHandler(interaction) {
    const option = interaction.values;
    const messageId = interaction.message.id;
    const user = interaction.user.id;
    try {
        const reply = await bot.commands.get('poll').cast(messageId, option, user);
        interaction.reply(reply);
    } catch (error) {
        console.error(error);
        if (!interaction.replied) await interaction.reply({ content: `Error executing command:\n${codeBlock('js', error)}`, ephemeral: true })
    }
}

async function joinButtonHandler(interaction) {
    try {
        const isMember = interaction.member.roles.cache.find(r => r.name === 'Member');
        if (isMember) return interaction.reply({ content: 'You are already a member.', ephemeral: true })
        const role = interaction.guild.roles.cache.find(r => r.name === 'Member');
        interaction.member.roles.add(role);
        interaction.reply({ content: 'You are now a Viking Motorsports member. Welcome!', ephemeral: true });
    } catch (error) {
        console.error(error)
        if (!interaction.replied) await interaction.reply({ content: `Error executing command:\n${codeBlock('js', error)}`, ephemeral: true })
    }
}

async function setCommandPermissions() {
    bot.application.fetch()
    const index = commandCache.map(c => c.name).indexOf('update')
    if (index === -1) return;
    const updateCommand = await bot.guilds.cache.get(config.guildID).commands.fetch(commandCache[index].id)
    const permissions = [{
        id: config.leadershipRoleId,
        type: 'ROLE',
        permission: true
    }]
    await updateCommand.permissions.add({ permissions })
}

async function testCommand() {
    const data = fs.readFileSync('./config.json')
    const competition = new Date(JSON.parse(data).competition);

    if (Date.now() > competition) return;

    const days = Math.ceil((competition.getTime() - Date.now()) / 8.64e+7);
    if (days > 60) return;

    // console.log(days);

    try {
        bot.channels.cache.get('644810281611952130').send(`competition: ${competition}\ndate now: ${Date.now()}\n${days} days until competition.`);
    } catch (error) {
        console.error(error);
    }
}