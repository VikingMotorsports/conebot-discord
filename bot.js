const Discord = require('discord.js');
const {
    token,
    prefix
} = require('./config.json');
const bot = new Discord.Client({
    disableEveryone: true
});
const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    bot.commands.set(command.name, command);
    console.log(`${command.name} loaded`);
}
// fs.readdir('./cmds', (err, files) => {
//     if (err) console.log(err);

//     let jsFiles = files.filter(f => f.split('.').pop() === "js");
//     if (jsFiles.length <= 0) {
//         console.log('No commands');
//         return;
//     }

//     jsFiles.forEach((f, i) => {
//         let props = require(`./cmds/${f}`);
//         bot.commands.set(props.help.name, props);
//         console.log(`${i + 1}: ${f} loaded`);
//     });
// });

bot.login(token);

bot.on('ready', async () => {
    console.log(`Bot online as ${bot.user.username}`);
    bot.user.setActivity('your every move', {
        type: 'WATCHING'
    }); // sets what the bot is playing

    //* script for creating an invite link for the bot
    // try {
    //     const invite = await bot.generateInvite(['ADD_REACTIONS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'CHANGE_NICKNAME', 'MANAGE_ROLES', 'MANAGE_EMOJIS']);
    //     console.log(invite);
    // } catch (error) {
    //     console.log(error);
    // }
});

// bot.on('guildMemberAdd', async (member) => {

// });

bot.on('message', async (message) => {
    if (message.author.bot) return; // ignores messages made by bots
    if (message.channel.type === ('dm' || 'group')) return; // ignores messages outside of channels
    if (message.channel === '644808361048801290') return;
    if (message.content.toLowerCase().includes('\`')) return; // ignores messages with code blocks
    // console.log(message);
    const args = message.content.toLowerCase().split(/ +/);
    const commandName = args.shift();
    // console.log(commandName);
    // if (!bot.commands.has(commandName)) return;
    // if (cmds.length <= 1) return;

    if (message.content.toLowerCase().includes('hello')) {
        const blobwave = await findEmoji("blobwave");
        message.channel.send(`Hi! ${blobwave}`);
    }
    if (message.mentions.everyone) {
        const pingsock = await findEmoji('pingsock');
        const pingthink = await findEmoji('pingthink');
        let emojis = [pingsock, pingthink];

        message.react(emojis[Math.floor(Math.random() * emojis.length)]);
    }
    if (message.content.toLowerCase().includes('sticky liquid' || 'sticky juice')) {
        // const emoji = await findEmoji('smile');
        message.react('💦');
    }
    if (message.author === '216771586651455492' && (message.content.includes('vodka') || message.content.toLowerCase.includes('russian water') || message.content.toLowerCase.includes('slav') || message.content.toLowerCase.includes('whiskey'))) {
        const blyat = await findEmoji('blyat')
        message.react(blyat);
    }
    if (message.content.toLowerCase().includes('good night') || message.content.toLowerCase().includes('gnight') || message.content.toLowerCase.includes('good morning') || message.content.toLowerCase.includes('good afternoon')) {
        try {
            bot.commands.get('greeting').execute(message, args);
        } catch (error) {
            console.error(error);
        }
    }
    // if (message.content.toLowerCase() === `${prefix}help`) {
    //     bot.commands.get('help').execute(message, args);
    // }
    else if (commandName.startsWith(prefix)) {
        // const cmd = cmds.slice(1);
        const cmds = commandName.slice(prefix.length);
        const command = bot.commands.get(cmds) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmds));
        // console.log(cmds);
        // console.log(command);
        try {
            if (command.args && !args.length) {
                message.channel.send('You need to provide arguments for that command.');
            } else {
                // console.log(args);
                command.execute(message, args);
            }
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error executing that command');
        }
    }
});

async function findEmoji(emojiName) {
    const emoji = await bot.emojis.find(emote => emote.name === emojiName);
    return emoji;
}