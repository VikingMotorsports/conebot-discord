const { designlog } = require('../links.json');

module.exports = {
    name: 'designlog',
    aliases: ['log'],
    description: 'Working document for design logs of the car',
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(designlog);
    }
}