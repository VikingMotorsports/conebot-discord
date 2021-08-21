const { MessageEmbed } = require('discord.js');
const { liability, photoRelease } = require('../links.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waiver')
        .setDescription('Links to VMS liability waivers'),
    aliases: ['liability', 'release', 'waivers'],
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        return await embedBuilder();
    },
    interact: async (interaction) => {
        interaction.reply(await embedBuilder());
    }
}

async function embedBuilder() {
    const embed = new MessageEmbed().setTitle('VMS Waivers').setColor('#004426')
        .setDescription('When completed, submit these waivers through this form https://forms.gle/EdmLFKwKcqSereph8')
        .addField('Liability Waiver', liability)
        .addField('Photo Release', photoRelease);

    return { embeds: [embed] };
}