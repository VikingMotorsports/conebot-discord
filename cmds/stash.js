const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stash')
        .setDescription('VMS stash directory'),
    category: 'Team',
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
    const stashEmbed = new Discord.MessageEmbed()
        .setColor('#004426')
        .setTitle('Connecting to VMS Stash')
        .addField('on Windows', 'https://cat.pdx.edu/platforms/windows/remote-access/windows-to-stash/')
        .addField('on Mac', 'https://cat.pdx.edu/platforms/mac/remote-access/stash/')
        .addField('on Linux', 'https://cat.pdx.edu/platforms/linux/remote-access/connect-stash/')
        .addField('Stash name', 'vms');

    return { embeds: [stashEmbed] };
}