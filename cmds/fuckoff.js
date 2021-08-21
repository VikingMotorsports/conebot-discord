const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'fuckoff',
        description: 'When you wanna give someone the finger'
    },
    aliases: ['fuckyou'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        const fuckoffs = ['asshole', 'bag', 'bucket', 'bye', 'cool', 'cup', 'family', 'fascinating', 'flying', 'fyyff', 'give', 'horse', 'immensity', 'looking', 'no', 'ratsares', 'shit', 'single', 'thanks', 'that', 'this', 'too', 'what', 'zero'];
        const endpoint = fuckoffs[Math.floor(Math.random() * fuckoffs.length)];
        const user = message.member.nickname;
        const Url = `https://www.foaas.com/${endpoint}/${user}`;

        try {
            const response = await axios({
                method: 'get',
                url: Url,
                headers: {
                    'Accept': 'application/json'
                }
            });
            const payload = response.data;
            const embed = new Discord.MessageEmbed()
                .setColor('#96031A')
                .setDescription(`${payload.message}`)
                .setFooter(`${payload.subtitle}`);

            // message.channel.send(embed);
            return { embeds: [embed] };
        } catch (error) {
            console.error(error);
        }
    }
}