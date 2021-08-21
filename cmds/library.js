const { library } = require('../links.json');

module.exports = {
    data: {
        name: 'library',
        description: 'Reference documents folder'
    },
    aliases: ['lightreading', 'read', 'documents', 'reference'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (bot, message, args) => {
        return library;
    }
}