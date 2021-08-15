const Discord = require('discord.js');

module.exports = {
    data: {
        name: 'userinfo',
        description: 'VMS stash directory'
    },
    aliases: ['user', 'avatar', 'username'],
    showInHelp: false,
    easteregg: true,
    usage: '<@user>',
    execute: async (bot, message, args) => {
        if (!message.mentions.users.size) {
            const name = message.author.username;
            const id = message.author.id;
            const avatar = message.author.avatarURL({ dynamic: true });
            const discriminator = message.author.discriminator;
            const userEmbed = new Discord.MessageEmbed()
                .setColor('#00635D')
                .setTitle('User Info')
                .setThumbnail(avatar)
                .addField('Username', name)
                .addField('Discriminator', discriminator)
                .addField('ID', id);
            console.log(avatar);
            return message.channel.send(userEmbed);
        }
        const userList = message.mentions.users.map(user => {
            const userEmbed = new Discord.MessageEmbed()
                .setColor('#00635D')
                .setTitle('User Info')
                .setThumbnail(user.avatarURL({ dynamic: true }))
                .addField('Username', user.username)
                .addField('Discriminator', user.discriminator)
                .addField('ID', user.id);

            return message.channel.send(userEmbed);
        });
    }
}