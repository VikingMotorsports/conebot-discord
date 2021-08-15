const { car } = require('../links.json');

module.exports = {
    data: {
        name: 'car',
        description: 'Google Drive folder of collaboration documents for the current car'
    },
    aliases: ['currentcar'],
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(car);
    }
}