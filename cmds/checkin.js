const { checkin } = require('../links.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checking')
        .setDescription('Form to check in to meetings and events'),
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send(`Check in to meetings, workshops, and events here:\n${checkin}`);
    }
}