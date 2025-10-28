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
    execute: async (bot, message, args) => {
        return rules;
    },
};
