const { handbook } = require('../links.json');

module.exports = {
    name: 'handbook',
    aliases: ['memberhandbook', 'newmember', 'newb', 'guide', 'standards'],
    description: 'Link to member handbook',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(handbook);
    }
}