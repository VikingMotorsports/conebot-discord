const { msds } = require('../links.json');

module.exports = {
    data: {
        name: 'msds',
        description: 'Folder containing all relevant material safety data sheets (MSDS)'
    },
    aliases: ['safety', 'safetysheets'],
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(msds);
    }
}