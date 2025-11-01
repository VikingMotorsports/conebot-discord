/**
 * @file Link to FSAE and BAJASAE rule books.
 *
 * Prefix command:
 * <prefix>rules            Return embedded message.
 *
 * Slash command:
 * /rules                   Return embedded message.
 */

const { rulesFSAE, rulesBAJASAE } = require('../../links.json');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Link to Formula SAE and Baja SAE rule books'),
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    isSlashCommand: true,
    execute: async (_bot, _message, _args) => {
        return embed();
    },
    interact: async (interaction) => {
        await interaction.reply(embed());
    },
};

function embed() {
    const rulebookEmbed = new EmbedBuilder()
        .setColor('#004426')
        .setTitle('Rule books')
        .addFields(
            { name: 'Formula SAE', value: rulesFSAE },
            { name: 'Baja SAE', value: rulesBAJASAE }
        )
        .setFooter({
            text: 'Contact a leader or server developer if rulebooks are out of date.',
        });

    return { embeds: [rulebookEmbed] };
}
