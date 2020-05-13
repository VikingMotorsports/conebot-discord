const { library } = require('../links.json');

module.exports = {
    name: 'library',
    aliases: ['lightreading', 'read', 'documents', 'reference'],
    description: 'Reference documents folder',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(library);
    }
}