const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'fuckall',
    aliases: ['fuckeverything', 'fuckyouall'],
    description: 'When you wanna curse the whole world',
    execute(message, args) {
        const fuckalls = ['everyone', 'everything'];
        const endpoint = fuckalls[Math.floor(Math.random() * fuckoffs.length)];
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