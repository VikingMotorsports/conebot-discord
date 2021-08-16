const { rulesChannel } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Return invite link to the VMS Discord server'),
    aliases: ['invitelink'],
    category: 'Server Moderation',
    showInHelp: true,
    execute: async (bot, message, args) => {
        const invites = await bot.channels.cache.get(rulesChannel).fetchInvites();
        const inviteURL = invites.first().url;
        message.channel.send(`Invite members to this server using this link:\n${inviteURL}`);
    }
}