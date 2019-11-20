const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'kanye',
    aliases: ['kanyequote'],
    description: 'Kanye West quotes',
    execute(message, args) {
        axios.get('https://api.kanye.rest/').then(res => {
            const quote = res.data.quote;
            const embed = new Discord.RichEmbed()
                .setColor('#96031A')
                .setDescription(`"${quote}"\n*- Kanye West*`)
                .setThumbnail('https://i.imgur.com/IHr3gbj.jpg')
                .setFooter('https://kanye.rest/')

            message.channel.send(embed);
        });
    }
}