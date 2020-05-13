const { drive } = require('../links.json');

module.exports = {
    name: 'drive',
    aliases: ['googledrive'],
    description: 'Main Google Drive folder',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(drive);
    }
}