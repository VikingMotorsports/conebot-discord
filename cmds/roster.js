const { roster } = require('../links.json');

module.exports = {
    name: 'roster',
    aliases: ['members'],
    description: 'Team roster spreadsheet',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send(roster);
    }
}