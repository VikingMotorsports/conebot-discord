const { order } = require('../links.json');

module.exports = {
    data: {
        name: 'order',
        description: 'Ordering form'
    },
    aliases: ['buy', 'orderform'],
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send(order);
    }
}