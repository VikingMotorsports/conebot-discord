/**
 * @file The team's Google calendar
 *
 * Prefix command:
 * <prefix>calendar          Return link.
 */

const { calendar } = require('../../links.json');

module.exports = {
    data: {
        name: 'calendar',
        description: "The team's Google calendar",
    },
    aliases: ['cal'],
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return calendar || 'error: field unset';
    },
};
