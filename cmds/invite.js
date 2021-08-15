const { rulesChannel } = require('../config.json');

module.exports = {
    data: {
        name: 'invite',
        description: 'Invite link to the VMS Discord server'
    },
    aliases: ['invitelink'],
    category: 'Server Moderation',
    showInHelp: true,
    execute: async (bot, message, args) => {
        const invites = await bot.channels.cache.get(rulesChannel).fetchInvites();
        const inviteURL = invites.first().url;
        message.channel.send(`Invite members to this server using this link:\n${inviteURL}`);
    }
}