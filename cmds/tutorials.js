const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutorials')
        .setDescription('List of links to tutorials'),
    aliases: ['tutorial'],
    category: 'Miscellaneous',
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
    const tutorialEmbed = new Discord.MessageEmbed()
        .setColor('#004426')
        .setTitle('Tutorials')
        .addField('SolidWorks', 'https://www.solidworks.com/sw/resources/solidworks-tutorials.htm')
        .addField('SolidWorks workshop', 'https://www.youtube.com/playlist?list=PL6AO3_MiwR-Yz09_lw_u3ivDrcKFk9bJD')
        .addField('LaTeX', 'https://www.latex-tutorial.com/')
        .addField('Coding', 'https://www.w3schools.com/')
        .addField('Using Abaqus for Chassis Simulation', 'https://drive.google.com/open?id=1sS9be25Nj2IoOwkJELR1M9gVe0-DaaQNVsUQKTJNZlc')
        .setFooter('If you want more tutorials added in, contact Geary or another server developer.');

    return { embeds: [tutorialEmbed] };
}