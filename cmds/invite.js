const { rulesChannel } = require('../config.json');

module.exports = {
    name: 'invite',
    aliases: ['invitelink'],
    description: 'Invite link to the VMS Discord server',
    category: 'Server Moderation',
    showInHelp: true,
    execute: async (bot, message, args) => {
        const invites = await bot.channels.cache.get(rulesChannel).fetchInvites();
        const inviteURL = invites.first().url;
        message.channel.send(`Invite members to this server using this link:\n${inviteURL}`);
    }
}