/**
 * @file Link to member handbook.
 *
 * Prefix command:
 * <prefix>handbook          Return link.
 */

const { handbook } = require('../../links.json');

module.exports = {
    data: {
        name: 'handbook',
        description: 'Link to member handbook',
    },
    aliases: ['memberhandbook', 'newmember', 'newb', 'guide', 'standards'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return handbook || 'error: field unset';
    },
};
