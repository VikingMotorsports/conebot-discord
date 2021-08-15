const { calendar } = require('../links.json');

module.exports = {
    data: {
        name: 'calendar',
        description: 'The team\'s Google calendar'
    },
    aliases: [],
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(calendar);
    }
}