const { affiliate } = require('../links.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('affiliate')
        .setDescription(
            'Tutorial on how to affiliate yourself with the team on sae.org'
        ),
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (bot, message, args) => {
        return affiliate;
    },
};
