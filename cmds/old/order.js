const { order } = require('../links.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

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
    execute: async (bot, message, args) => {
        return order;
    },
    interact: async (interaction) => {
        interaction.reply(order);
    },
};
