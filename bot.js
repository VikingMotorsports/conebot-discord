const Discord = require('discord.js');
const botSettings = require('./botSettings.json');
const bot = new Discord.Client();

bot.login(botSettings.token);

bot.on('ready', async () => {
    console.log(`Bot online as ${bot.user.username}`);
    try {
        const invite = await bot.generateInvite(['ADD_REACTIONS', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'CONNECT', 'SPEAK', 'CHANGE_NICKNAME', 'MANAGE_ROLES', 'MANAGE_EMOJIS']);
        console.log(invite);
    } catch (error) {
        console.log(error);
    }
});

bot.on('guildMemberAdd', async (member) => {

});

bot.on('message', async (message) => {
    // console.log(message);
    if (message.author.bot === true) { // ignores messages made by bots
        return;
    }
    if (message.content.toLowerCase().includes('\`')) { // ignores code blocks
        return;
    }

});