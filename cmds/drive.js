const { drive } = require('../links.json');

module.exports = {
    data: {
        name: 'drive',
        description: 'Main Google Drive folder'
    },
    aliases: ['googledrive'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(drive);
    }
}