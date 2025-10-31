/**
 * @file Returns a link to sign up for an OnShape education account.
 *
 * Prefix command:
 * <prefix>onshape          Return link.
 */

const { onshape } = require('../../links.json');

module.exports = {
    data: {
        name: 'onshape',
        description: 'sign up for an OnShape education account',
    },
    aliases: [],
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return onshape || 'error: field unset';
    },
};
