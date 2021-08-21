const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'inspiration',
        description: 'When you need motivation to get through the day...'
    },
    aliases: ['inspirationalimage', 'inspirational', 'motivation', 'getmotivated', 'inspire'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const response = await axios.get('http://inspirobot.me/api?generate=true');
            const embed = new Discord.MessageEmbed()
                .setColor('#96031A')
                .setImage(response.data)
                .setFooter('Generated from InspiroBot');

            // message.channel.send(embed);
            return { embeds: [embed] };
        } catch (error) {
            console.error(error);
        }
    }
}