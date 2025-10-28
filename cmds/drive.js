const { SlashCommandBuilder } = require('@discordjs/builders');
const { drive } = require('../links.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drive')
        .setDescription('Main Google Drive folder'),
    aliases: ['googledrive'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        return drive;
    },
    interact: async (interaction) => {
        interaction.reply(drive);
    },
};
