/**
 * @file Overall timeline of vehicle projects.
 *
 * Prefix command:
 * <prefix>gantt         Return link.
 *
 * Slash command:
 * /gantt                Return link.
 */

const { SlashCommandBuilder } = require('discord.js');
const { gantt } = require('../../links.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gantt')
    .setDescription('Overall timeline of vehicle projects'),
  aliases: ['ganttchart', 'timeline'],
  category: 'Car',
  showInHelp: true,
  easteregg: false,
  throughLinksCommand: true,
  execute: async (_bot, _message, _args) => {
    return gantt || 'error: field unset';
  },
  interact: async (interaction) => {
    await interaction.reply(gantt || 'error: field unset');
  },
};
