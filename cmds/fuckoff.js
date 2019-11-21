const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'fuckoff',
    aliases: ['fuckyou'],
    description: 'When you wanna give someone the finger',
    execute(message, args) {
        const fuckoffs = ['asshole', 'bag', 'bucket', 'bye', 'cool', 'cup', 'family', 'fascinating', 'flying', 'fyyff', 'give', 'horse', 'immensity', 'looking', 'no', 'ratsares', 'shit', 'single', 'thanks', 'that', 'this', 'too', 'what', 'zero'];
        const endpoint = fuckoffs[Math.floor(Math.random() * fuckoffs.length)];
        const user = message.member.nickname;
        axios({
            method: 'get',
            url: `https://www.foaas.com/${endpoint}/${user}`,
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            const payload = res.data;
            const embed = new Discord.RichEmbed()
                .setColor('#96031A')
                .setDescription(`${payload.message}`)
                .setFooter(`${payload.subtitle}`);

            message.channel.send(embed);
        }).catch(console.error);
    }
}