const { car } = require('../links.json');

module.exports = {
    data: {
        name: 'car',
        description:
            'Google Drive folder of collaboration documents for the current car',
    },
    aliases: ['currentcar'],
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return car;
    },
};
