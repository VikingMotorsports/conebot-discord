const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'bored',
        description: 'Find something to do'
    },
    aliases: ['activity', 'newactivity'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const res = await axios.get('https://boredapi.com/api/activity/');
            let price, difficulty;

            if (res.data.price <= 0.2) {
                price = '💵';
            } else if (res.data.price <= 0.4) {
                price = '💵💵';
            } else if (res.data.price <= 0.6) {
                price = '💵💵💵';
            } else if (res.data.price <= 0.8) {
                price = '💵💵💵💵';
            } else if (res.data.price <= 1.0) {
                price = '💵💵💵💵💵';
            }

            if (res.data.accessibility <= 0.2) {
                difficulty = '⭐';
            } else if (res.data.accessibility <= 0.4) {
                difficulty = '⭐⭐';
            } else if (res.data.accessibility <= 0.6) {
                difficulty = '⭐⭐⭐';
            } else if (res.data.accessibility <= 0.8) {
                difficulty = '⭐⭐⭐⭐';
            } else if (res.data.accessibility <= 1.0) {
                difficulty = '⭐⭐⭐⭐⭐';
            }

            const embed = new Discord.MessageEmbed()
                .setColor('#96031A')
                .setTitle(res.data.activity)
                .addField('Type', res.data.type.capitalize())
                .addField('Difficulty', difficulty)
                .addField('Price', price);

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
        }
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}