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
    throughLinksCommand: true,
    execute: async (bot, message, args) => {
        return purchases;
    }
}