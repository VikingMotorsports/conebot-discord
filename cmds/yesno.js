const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'yesno',
        description: 'Yes or no?'
    },
    aliases: ['yesorno'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const res = await axios.get('https://yesno.wtf/api');
            const embed = new MessageEmbed()
                .setTitle(res.data.answer.capitalize())
                .setImage(res.data.image);

            return { embeds: [embed] }
        } catch (error) {
            console.error(error);
        }
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}