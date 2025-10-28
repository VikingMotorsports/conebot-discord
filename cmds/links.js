const { SlashCommandBuilder } = require('@discordjs/builders');
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
                .addChoices([
                    ['SAE.org Team Affiliation', 'affiliate'],
                    ['Team Calendar', 'calendar'],
                    ['Working Car Folder', 'car'],
                    ['Design Log', 'designlog'],
                    ['Gantt chart', 'gantt'],
                    ['Member Handbook', 'handbook'],
                    ['Team Library', 'library'],
                    ['Meeting Minutes', 'minutes'],
                    ['Material Safety Data Sheets', 'msds'],
                    ['Team Purchases', 'purchases'],
                    ['Team Roster', 'roster'],
                    ['Current Rule Book', 'rules'],
                ])
        ),
    showInHelp: true,
    category: 'Team',
    isSlashCommand: true,
    interact: async (interaction) => {
        const requestedLink = interaction.options.getString('item');
        const linkString = links[requestedLink];

        interaction.reply(linkString);
    },
};
