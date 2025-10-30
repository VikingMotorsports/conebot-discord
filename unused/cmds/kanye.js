const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'kanye',
        description: 'Kanye West quotes',
    },
    aliases: ['kanyequote'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const response = await axios.get('https://api.kanye.rest/');
            const quote = response.data.quote;
            const embed = new Discord.MessageEmbed()
                .setColor('#96031A')
                .setDescription(`"${quote}"\n*- Kanye West*`)
                .setThumbnail('https://i.imgur.com/IHr3gbj.jpg')
                .setFooter('https://kanye.rest/');

            return { embeds: [embed] };
        } catch (error) {
            console.error(error);
        }
    },
};
