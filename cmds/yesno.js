const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'yesno',
    aliases: ['yesorno'],
    description: 'Yes or no?',
    execute(message, args) {
        axios.get('https://yesno.wtf/api').then(res => {
            const payload = res.data;
            const embed = new Discord.RichEmbed()
                .setTitle(`${payload.answer.capitalize()}`)
                .setImage(`${payload.image}`);

            message.channel.send(embed);
        });
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}