const { purchases } = require('../links.json');

module.exports = {
    name: 'purchases',
    aliases: ['orders', 'orderstatus'],
    description: 'Spreadsheet outlining purchasing information and status',
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send(purchases);
    }
}