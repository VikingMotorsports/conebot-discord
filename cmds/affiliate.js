const { affiliate } = require('../links.json');

module.exports = {
    data: {
        name: 'affiliate',
        description: 'Tutorial on how to affiliate yourself with the team on sae.org',
    },
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        return affiliate;
    },
    interact: async interaction => {
        interaction.reply(affiliate);
    }
}