/**
 * @file Return invite link to the VMS Discord server.
 *
 * Prefix command:
 * <prefix>invite            Return invite.
 *
 * Slash command:
 * /invite                   Return invite.
 */

const { guildID, rulesChannel } = require('../../config.json');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Return invite link to the VMS Discord server'),
    aliases: ['invitelink'],
    category: 'Server Moderation',
    showInHelp: true,
    isSlashCommand: true,
    execute: async (bot, _message, _args) => {
        return await getInviteLink(bot);
    },
    interact: async (interaction) => {
        await interaction.reply(await getInviteLink(interaction.client));
    },
};

async function getInviteLink(client) {
    const guild = await client.guilds.fetch(guildID);
    const invite = await guild.invites.create(rulesChannel);
    return `Invite members to this server using this link:\n${invite}`;
}
