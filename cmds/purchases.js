const { purchases } = require('../links.json');

module.exports = {
    data: {
        name: 'purchases',
        description: 'Spreadsheet outlining purchasing information and status'
    },
    aliases: ['orders', 'orderstatus'],
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send(purchases);
    }
}