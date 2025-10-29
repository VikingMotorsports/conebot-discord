/**
 * @file Tutorial on how to affiliate yourself with the team on sae.org
 *
 * Prefix command:
 * <prefix>affiliate
 */

const { affiliate } = require('../links.json');
const { SlashCommandBuilder } = require('discord.js');

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
    execute: async (_bot, _message, _args) => {
        return affiliate;
    },
};
