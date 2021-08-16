const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pdm')
        .setDescription('How to get up and running with PDM'),
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        const embed = new MessageEmbed().setTitle('Setting up PDM').setColor('#004426')
            .setDescription(`Work through the steps in the given order. Prior to connecting to the PDM, inform a leadership member so that they can create a user account for you. If you have any questions, feel free to reach out to leadership.`)
            .addField('1. Familiarize yourself with the parts naming scheme', 'https://drive.google.com/file/d/1V9Qpcd-OfVVbPAqEXigI4VsCuygEc3o5/view?usp=sharing')
            .addField('2. Connect to the Vault', 'https://docs.google.com/document/d/1Qqnl0Wx0X3goQoDqMQ1wXg2nOPQApGQ1mY8Ef_BN_Hs/edit?usp=sharing')
            .addField('3. Learn the basic workflow of PDM', 'https://youtu.be/dGfZCgigtQ4');

        message.channel.send(embed);
    }
}