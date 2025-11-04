/**
 * @file Returns link for document or folder.
 *
 * Slash command:
 * /links item:name
 */

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const links = require('../../links.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('links')
        .setDescription('Returns link for document or folder')
        .addStringOption((option) =>
            option
                .setName('item')
                .setDescription('Item to get link for')
                .setRequired(false)
                .addChoices(
                    {
                        name: 'SAE.org Team Affiliation',
                        value: 'affiliate',
                    },
                    { name: 'Team Calendar', value: 'calendar' },
                    { name: 'Working Car Folder', value: 'car' },
                    { name: 'Check in', value: 'checkin' },
                    { name: 'Design Log', value: 'designlog' },
                    { name: 'Drive', value: 'drive' },
                    { name: 'Gantt chart', value: 'gantt' },
                    { name: 'Member Handbook', value: 'handbook' },
                    { name: 'Meeting Minutes', value: 'minutes' },
                    {
                        name: 'Material Safety Data Sheets',
                        value: 'msds',
                    },
                    { name: 'Order', value: 'order' },
                    { name: 'Team Purchases', value: 'purchases' },
                    { name: 'Team Library', value: 'library' },
                    { name: 'Team Roster', value: 'roster' },
                    { name: 'Current Rule Book', value: 'rules' },
                    { name: 'OnShape', value: 'onshape' },
                    { name: 'Website', value: 'website' }
                )
        ),
    args: true,
    showInHelp: true,
    easteregg: false,
    usage: '<link name>',
    category: 'Team',
    isSlashCommand: true,
    execute: async (_bot, _message, args) => {
        const requestedLink = args.shift();
        if (!(requestedLink in links)) {
            return `\`${requestedLink}\` is not a valid option.`;
        }

        return links[requestedLink] || 'error: field unset';
    },
    interact: async (interaction) => {
        const requestedLink = interaction.options.getString('item');
        if (requestedLink !== null) {
            if (!(requestedLink in links)) {
                await interaction.reply(
                    `\`${requestedLink}\` is not a valid option.`
                );
                return;
            }

            await interaction.reply(
                links[requestedLink] || 'error: field unset'
            );
            return;
        } else {
            await interaction.reply(embed());
            return;
        }
    },
};

/**
 * Return an embed with all available links.
 */
function embed() {
    const linksEmbed = new EmbedBuilder()
        .setTitle('All available links')
        .setColor('#004225')
        .addFields(
            ...(() => {
                const fields = [];
                for (const key in links) {
                    fields.push({ name: key, value: links[key] });
                }
                return fields;
            })()
        );

    return { embeds: [linksEmbed] };
}
