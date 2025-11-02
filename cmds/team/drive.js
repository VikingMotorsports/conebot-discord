/**
 * @file Main Google Drive folder.
 *
 * Prefix command:
 * <prefix>drive         Return link.
 *
 * Slash command:
 * /drive                Return link.
 */

const { SlashCommandBuilder } = require('discord.js');
const { drive } = require('../../links.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drive')
        .setDescription('Main Google Drive folder'),
    aliases: ['googledrive'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    isSlashCommand: true,
    execute: async (_bot, _message, _args) => {
        return drive || 'error: field unset';
    },
    interact: async (interaction) => {
        await interaction.reply(drive || 'error: field unset');
    },
};
