const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'avatar', 'username'],
    description: 'VMS stash directory',
    easteregg: true,
    usage: '<@user>',
    execute(message, args) {
        if (!message.mentions.users.size) {
            const name = message.author.username;
            const id = message.author.id;
            const avatar = message.author.avatarURL;
            const discriminator = message.author.discriminator;
            const userEmbed = new Discord.RichEmbed()
                .setColor('#00635D')
                .setTitle('User Info')
                .setThumbnail(avatar)
                .addField('Username', name)
                .addField('Discriminator', discriminator)
                .addField('ID', id);

            return message.channel.send(userEmbed);
        }
        const userList = message.mentions.users.map(user => {
            const userEmbed = new Discord.RichEmbed()
                .setColor('#00635D')
                .setTitle('User Info')
                .setThumbnail(user.avatarURL)
                .addField('Username', user.username)
                .addField('Discriminator', user.discriminator)
                .addField('ID', user.id);

            return message.channel.send(userEmbed);
        });
    }
}