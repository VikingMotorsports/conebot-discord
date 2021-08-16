const { license } = require('../links.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('license')
        .setDescription('Form to submit a request for a Solidworks license key'),
    aliases: ['licenseRequest', 'licenserequest', 'request', 'solidworks'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(license);
    }
}