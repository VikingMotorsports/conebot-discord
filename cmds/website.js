const { website } = require('../links.json');

module.exports = {
    name: 'website',
    aliases: ['site'],
    description: 'The team\'s website',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(website);
    }
}