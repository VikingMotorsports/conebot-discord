const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'inspiration',
    aliases: ['inspirationalimage', 'inspirational', 'motivation', 'getmotivated', 'inspire'],
    description: 'When you need motivation to get through the day...',
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const response = await axios.get('http://inspirobot.me/api?generate=true');
            const embed = new Discord.RichEmbed()
                .setColor('#96031A')
                .setImage(response.data)
                .setFooter('Generated from InspiroBot');

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
        }
    }
}