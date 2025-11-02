/**
 * @file General meeting minutes.
 *
 * Prefix command:
 * <prefix>minutes           Return link.
 *
 * Slash command:
 * /minutes                 Return link.
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { minutes } = require('../../links.json');

module.exports = {
    // Defines the slash command structure using SlashCommandBuilder.
    data: new SlashCommandBuilder()
        .setName('minutes')
        .setDescription('General meeting minutes.'),
    
    // Properties for prefix command handling
    aliases: ['minute', 'meetingminutes'],
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,

    /**
     * Core logic for the minutes command.
     * This function is designed to be agnostic to whether it's called
     * by a prefix command or a slash command.
     * @param {import('discord.js').Message|import('discord.js').CommandInteraction} _context The message or interaction object.
     * @returns {Promise<string>} The content to be sent back to the user.
     */
    async run(_context) {
        // The context argument is unused here but maintained for a consistent function signature across commands.
        return minutes || 'error: field unset';
    },

    /**
     * Executes the command for a prefix message.
     * This keeps the original `execute` function name for compatibility
     * with the existing prefix command handler.
     * @param {import('discord.js').Client} _bot The bot client.
     * @param {import('discord.js').Message} message The message object.
     * @param {string[]} _args The message arguments.
     * @returns {Promise<string>} The content to be sent back to the user.
     */
    async execute(_bot, message, _args) {
        return this.run(message);
    },

    /**
     * Executes the command for a slash interaction.
     * @param {import('discord.js').CommandInteraction} interaction The interaction object.
     * @returns {Promise<string>} The content to be sent back to the user.
     */
    async executeSlash(interaction) {
        return this.run(interaction);
    },
};