/**
 * @file Update bot parameters.
 *
 * Prefix command:
 * <prefix>update <parameter> <value>            Update bot parameter.
 *
 * Slash command:
 * <prefix>update parameter:name value:value     Update bot parameter.
 */

const fs = require('node:fs');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const updatableParameters = ['competition', 'prefix'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update bot parameters')
        .addStringOption((option) =>
            option
                .setName('parameter')
                .setDescription('Select parameter to update')
                .setRequired(true)
                .addChoices(
                    { name: 'Competition Date', value: 'competition' },
                    { name: 'Bot Prefix', value: 'prefix' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('value')
                .setDescription('Value to update the parameter to')
                .setRequired(true)
        ),
    category: 'Server Moderation',
    usage: '<parameter> <new value>',
    args: true,
    showInHelp: true,
    easteregg: false,
    isSlashCommand: true,
    execute: async (_bot, message, args) => {
        const leadershipRole = message.guild.roles.cache.find(
            (r) => r.name === 'Leadership'
        );
        return updateParameter(
            leadershipRole,
            message.member,
            args[0],
            args.slice(1).join(' ')
        );
    },
    interact: async (interaction) => {
        const leadershipRole = interaction.guild.roles.cache.find(
            (r) => r.name === 'Leadership'
        );
        const parameter = interaction.options.getString('parameter');
        const value = interaction.options.getString('value');

        await interaction.reply(
            updateParameter(
                leadershipRole,
                interaction.member,
                parameter,
                value
            )
        );
    },
};

function updateParameter(leadershipRole, member, parameter, updatedValue) {
    if (!member.roles.cache.has(leadershipRole.id)) {
        return 'Not allowed.';
    }
    if (!updatableParameters.includes(parameter)) {
        return 'That parameter is not updatable.';
    }

    const configFile = fs.readFileSync('./config.json', 'utf-8');
    const config = JSON.parse(configFile);
    config[parameter] = updatedValue;

    fs.writeFileSync(
        './config.json',
        JSON.stringify(config, null, '\t'),
        (err) => {
            if (err) console.error(err);
        }
    );
    return {
        content: `Parameter \`${parameter}\` updated to ${updatedValue}`,
        flags: MessageFlags.Ephemeral,
    };
}
