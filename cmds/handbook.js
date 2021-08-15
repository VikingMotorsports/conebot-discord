const { handbook } = require('../links.json');

module.exports = {
    data: {
        name: 'handbook',
        description: 'Link to member handbook'
    },
    aliases: ['memberhandbook', 'newmember', 'newb', 'guide', 'standards'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(handbook);
    }
}