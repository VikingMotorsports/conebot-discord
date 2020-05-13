const { msds } = require('../links.json');

module.exports = {
    name: 'msds',
    aliases: ['safety', 'safetysheets'],
    description: 'Folder containing all relevant material safety data sheets (MSDS)',
    category: 'Team Info',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(msds);
    }
}