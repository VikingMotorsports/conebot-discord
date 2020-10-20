const { website, youtube, instagram, facebook } = require('../links.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'socialmedia',
    aliases: ['media', 'youtube', 'instagram', 'facebook', 'website', 'site', 'insta', 'yt', 'fb'],
    description: 'Shows VMS social media links',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('Viking Motorsports Social Media')
            .addField('Website', website)
            .addField('YouTube', youtube)
            .addField('Facebook', facebook)
            .addField('Instagram', instagram);

        message.channel.send(embed);
    }
}