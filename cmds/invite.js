const { rulesChannel } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Return invite link to the VMS Discord server'),
  aliases: ['invitelink'],
  category: 'Server Moderation',
  showInHelp: true,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    return await getInviteLink(bot);
  },
  interact: async (interaction) => {
    interaction.reply(await getInviteLink(interaction.client));
  },
};

async function getInviteLink(client) {
  const invites = await client.channels.cache.get(rulesChannel).fetchInvites();
  const inviteUrl = invites.first().url;
  return `Invite members to this server using this link:\n${inviteUrl}`;
}
