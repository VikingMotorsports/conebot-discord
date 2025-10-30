/**
 * @file Ordering form
 *
 * Prefix command:
 * <prefix>order         Return link.
 *
 * Slash command:
 * /order                Return link.
 */

const { order } = require('../links.json');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('order')
        .setDescription('Ordering form'),
    aliases: ['buy', 'orderform'],
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    isSlashCommand: true,
    execute: async (_bot, _message, _args) => {
        return order || 'error: field unset';
    },
    interact: async (interaction) => {
        await interaction.reply(order || 'error: field unset');
    },
};
