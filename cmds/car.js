const { car } = require('../links.json');

module.exports = {
    name: 'car',
    aliases: ['currentcar'],
    description: 'Google Drive folder of collaboration documents for the current car',
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(car);
    }
}