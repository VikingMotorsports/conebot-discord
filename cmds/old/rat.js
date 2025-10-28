const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('rat').setDescription("<',=,~~"),
    category: 'Miscellaneous',
    showInHelp: false,
    easteregg: true,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        return "<',=,~~";
    },
    interact: async (interaction) => {
        interaction.reply("<',=,~~");
    },
};
