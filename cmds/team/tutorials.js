/**
 * @file List of links to tutorials.
 *
 * Prefix command:
 * <prefix>tutorials         Return embedded message.
 *
 * Slash command:
 * /tutorials                Return embedded message.
 */

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutorials')
        .setDescription('List of links to tutorials'),
    aliases: ['tutorial'],
    category: 'Miscellaneous',
    showInHelp: true,
    easteregg: false,
    isSlashCommand: true,
    execute: async (_bot, _message, _args) => {
        return embed();
    },
    interact: async (interaction) => {
        await interaction.reply(embed());
    },
};

function embed() {
    const tutorialEmbed = new EmbedBuilder()
        .setColor('#004426')
        .setTitle('Tutorials')
        .addFields(
            { name: 'OnShape', value: 'https://learn.onshape.com/' },
            {
                name: 'SolidWorks',
                value: 'https://www.solidworks.com/sw/resources/solidworks-tutorials.htm',
            },
            {
                name: 'SolidWorks workshop',
                value: 'https://www.youtube.com/playlist?list=PL6AO3_MiwR-Yz09_lw_u3ivDrcKFk9bJD',
            },
            { name: 'LaTeX', value: 'https://www.latex-tutorial.com/' },
            { name: 'Coding', value: 'https://www.w3schools.com/' },
            {
                name: 'Using Abaqus for Chassis Simulation',
                value: 'https://drive.google.com/open?id=1sS9be25Nj2IoOwkJELR1M9gVe0-DaaQNVsUQKTJNZlc',
            }
        )
        .setFooter({
            text: 'Contact a leader or server developer if you want more tutorials added.',
        });

    return { embeds: [tutorialEmbed] };
}
