const { checkin } = require('../links.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Form to check in to meetings and events'),
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    args: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        return `Check in to meetings, workshops, and events here:\n${checkin}`
    },
    interact: async (interaction) => {
        interaction.reply(`Check in to meetings, workshops, and events here:\n${checkin}`);
    }
}