/**
    * @file Rat.
    *
    * Prefix command:
    * <prefix>rat           Print a rat.
    *
    * Slash command:
    * /rat                  Print a rat.
    */

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('rat').setDescription("<',=,~~"),
    category: 'Miscellaneous',
    showInHelp: false,
    easteregg: true,
    isSlashCommand: true,
    execute: async (_bot, _message, _args) => {
        return "<',=,~~";
    },
    interact: async (interaction) => {
        await interaction.reply("<',=,~~");
    },
};
