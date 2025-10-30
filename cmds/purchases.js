/**
 * @file Spreadsheet outlining purchasing information and status
 *
 * Prefix command:
 * <prefix>purchases         Return link.
 */

const { purchases } = require('../links.json');

module.exports = {
    data: {
        name: 'purchases',
        description: 'Spreadsheet outlining purchasing information and status',
    },
    aliases: ['orders', 'orderstatus'],
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return purchases || 'error: field unset';
    },
};
