/**
 * @file Retrieve user info.
 *
 * Prefix command:
 * <prefix>userinfo              Retrieve own user info.
 * <prefix>userinfo <@user>*     Retrieve one or more user's info.
 */

const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'userinfo',
        description: 'VMS stash directory',
    },
    aliases: ['user', 'avatar', 'username'],
    showInHelp: false,
    easteregg: true,
    usage: '<@user>',
    execute: (_bot, message, _args) => {
        if (!message.mentions.users.size) {
            const name = message.author.username;
            const id = message.author.id;
            const avatar = message.author.avatarURL({ dynamic: true });
            const discriminator = message.author.discriminator;
            const userEmbed = new EmbedBuilder()
                .setColor('#00635D')
                .setTitle('User Info')
                .setThumbnail(avatar)
                .addFields(
                    { name: 'Username', value: name },
                    { name: 'Discriminator', value: discriminator },
                    { name: 'ID', value: id }
                );
            console.log(avatar);
            return { embeds: [userEmbed] };
        }
        const userList = message.mentions.users.map((user) => {
            return new EmbedBuilder()
                .setColor('#00635D')
                .setTitle('User Info')
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Username', value: user.username },
                    { name: 'Discriminator', value: user.discriminator },
                    { name: 'ID', value: user.id }
                );
        });
        return { embeds: userList };
    },
};
