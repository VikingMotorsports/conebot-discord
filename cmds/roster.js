/**
 * @file Team roster spreadsheet.
 *
 * Prefix command:
 * <prefix>roster            Return link.
 */

const { roster } = require('../links.json');

module.exports = {
    data: {
        name: 'roster',
        description: 'Team roster spreadsheet',
    },
    aliases: ['members'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    args: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return roster || 'error: field unset';
    },
};
