const { rules } = require('../links.json');

module.exports = {
    name: 'rules',
    description: 'Link to FSAE rule book',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(rules);
    }
}