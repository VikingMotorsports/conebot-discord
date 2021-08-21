const { designlog } = require('../links.json');

module.exports = {
    data: {
        name: 'designlog',
        description: 'Working document for design logs of the car'
    },
    aliases: ['log'],
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (bot, message, args) => {
        return designlog;
    }
}