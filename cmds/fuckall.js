const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'fuckall',
        description: 'When you wanna curse the whole world'
    },
    aliases: ['fuckeverything', 'fuckyouall'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        const fuckalls = ['everyone', 'everything'];
        const endpoint = fuckalls[Math.floor(Math.random() * fuckalls.length)];
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
                .setDescription(payload.message)
                .setFooter(payload.subtitle);

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
        }
    }
}