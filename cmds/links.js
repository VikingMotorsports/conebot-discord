/**
 * @file Returns link for document or folder
 *
 * Slash command:
 * /links item:_
 */

const { SlashCommandBuilder } = require('discord.js');
const links = require('../links.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('links')
        .setDescription('Returns link for document or folder')
        .addStringOption((option) =>
            option
                .setName('item')
                .setDescription('Item to get link for')
                .setRequired(true)
                .addChoices(
                    { name: 'SAE.org Team Affiliation', value: 'affiliate' },
                    { name: 'Team Calendar', value: 'calendar' },
                    { name: 'Working Car Folder', value: 'car' },
                    { name: 'Check in', value: 'checkin' },
                    { name: 'Design Log', value: 'designlog' },
                    { name: 'Drive', value: 'drive' },
                    { name: 'Gantt chart', value: 'gantt' },
                    { name: 'Member Handbook', value: 'handbook' },
                    { name: 'Meeting Minutes', value: 'minutes' },
                    { name: 'Material Safety Data Sheets', value: 'msds' },
                    { name: 'Order', value: 'order' },
                    { name: 'Team Purchases', value: 'purchases' },
                    { name: 'Team Library', value: 'library' },
                    { name: 'Team Roster', value: 'roster' },
                    { name: 'Current Rule Book', value: 'rules' },
                    { name: 'Website', value: 'website' }
                )
        ),
    args: true,
    showInHelp: true,
    easteregg: false,
    usage: '<link name>',
    category: 'Team',
    isSlashCommand: true,
    interact: async (interaction) => {
        const requestedLink = interaction.options.getString('item');
        const linkString = links[requestedLink];

        if (linkString) {
            await interaction.reply(linkString);
        } else {
            await interaction.reply(
                'link unset: contact a leader or developer.'
            );
        }
    },
};
