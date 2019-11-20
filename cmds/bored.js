const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'bored',
    aliases: ['activity', 'newactivity'],
    description: 'Find something to do',
    execute(message, args) {
        axios.get('https://boredapi.com/api/activity/').then(res => {
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

            const embed = new Discord.RichEmbed()
                .setTitle(`${res.data.activity}`)
                .addField('Type', `${res.data.type}`)
                .addField('Difficulty', difficulty)
                .addField('Price', price);

            message.channel.send(embed);
        });
    }
}