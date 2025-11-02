/**
 * @file Form to check in to meetings and events.
 *
 * Prefix command:
 * <prefix>checkin       Return link.
 *
 * Slash command:
 * /checkin              Return link.
 */

const { checkin } = require('../../links.json');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Form to check in to meetings and events'),
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    args: false,
    isSlashCommand: true,
    execute: async (_bot, _message, _args) => {
        if (!checkin) {
            return 'error: field unset';
        }
        return `Check in to meetings, workshops, and events here:\n${checkin}`;
    },
    interact: async (interaction) => {
        if (!checkin) {
            await interaction.reply('error: field unset');
        }
        await interaction.reply(
            `Check in to meetings, workshops, and events here:\n${checkin}`
        );
    },
};
