const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    data: {
        name: 'eastereggs',
        description: 'List of easter eggs',
    },
    aliases: ['easteregg', 'random'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        let EE = [];
        bot.commands.map(c => {
            if (c.easteregg) {
                EE.push(`${prefix}${c.name}`);
            }
        });

        const embed = new Discord.MessageEmbed()
            .setTitle('Easter eggs')
            .setColor('#96031A')
            .setDescription(EE.join('\n'));

        message.channel.send(embed);
    }
}