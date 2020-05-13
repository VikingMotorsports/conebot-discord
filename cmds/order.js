const { order } = require('../links.json');

module.exports = {
    name: 'order',
    aliases: ['buy', 'orderform'],
    description: 'Ordering form',
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send(order);
    }
}