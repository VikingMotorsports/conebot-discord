const { calendar } = require('../links.json');

module.exports = {
    name: 'calendar',
    aliases: [],
    description: 'The team\'s Google calendar',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(calendar);
    }
}