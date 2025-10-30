/**
 * @file Reference documents folder
 *
 * Prefix command:
 * <prefix>library           Return link.
 */

const { library } = require('../../links.json');

module.exports = {
    data: {
        name: 'library',
        description: 'Reference documents folder',
    },
    aliases: ['lightreading', 'read', 'documents', 'reference'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return library || 'error: field unset';
    },
};
