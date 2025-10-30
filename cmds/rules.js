/**
 * @file Link to FSAE rule book.
 *
 * Prefix command:
 * <prefix>rules
 */

const { rules } = require('../links.json');

module.exports = {
    data: {
        name: 'rules',
        description: 'Link to FSAE rule book',
    },
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return rules || 'error: field unset';
    },
};
