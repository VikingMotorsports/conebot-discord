/**
 * @file Shows VMS social media links.
 *
 * Prefix command:
 * <prefix>socialmedia           Embed message.
 *
 * Slash command:
 * /socialmedia                  Embed message.
 */

const { website, youtube, instagram, facebook } = require('../../links.json');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socialmedia')
        .setDescription('Shows VMS social media links'),
    aliases: [
        'social',
        'media',
        'youtube',
        'instagram',
        'facebook',
        'website',
        'site',
        'insta',
        'yt',
        'fb',
    ],
    category: 'Team',
    args: false,
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
    const embed = new EmbedBuilder()
        .setTitle('Viking Motorsports Social Media')
        .setColor('#004426')
        .addFields(
            { name: 'Website', value: website || 'unset' },
            { name: 'YouTube', value: youtube || 'unset' },
            { name: 'Facebook', value: facebook || 'unset' },
            { name: 'Instagram', value: instagram || 'unset' }
        );

    return { embeds: [embed] };
}
