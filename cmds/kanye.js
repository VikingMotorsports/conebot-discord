const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'kanye',
    aliases: ['kanyequote'],
    description: 'Kanye West quotes',
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const response = await axios.get('https://api.kanye.rest/');
            const quote = response.data.quote;
            const embed = new Discord.RichEmbed()
                .setColor('#96031A')
                .setDescription(`"${quote}"\n*- Kanye West*`)
                .setThumbnail('https://i.imgur.com/IHr3gbj.jpg')
                .setFooter('https://kanye.rest/');

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
        }
    }
}