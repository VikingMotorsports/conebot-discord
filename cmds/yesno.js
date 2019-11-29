const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'yesno',
    aliases: ['yesorno'],
    description: 'Yes or no?',
    easteregg: true,
    execute: async (message, args) => {
        try {
            const res = await axios.get('https://yesno.wtf/api');
            const embed = new Discord.RichEmbed()
                .setTitle(res.data.answer.capitalize())
                .setImage(res.data.image);

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
        }
    }
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}