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
    execute: async (bot, message, args) => {
        message.channel.send(order);
    }
}