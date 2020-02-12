const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'eastereggs',
    aliases: ['easteregg', 'random'],
    description: 'List of easter eggs',
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        let EE = [];
        const easterArray = bot.commands.map(c => {
            if (c.easteregg) {
                EE.push(`${prefix}${c.name}`);
            }
        });

        const embed = new Discord.RichEmbed()
            .setTitle('Easter eggs')
            .setColor('#96031A')
            .setDescription(EE.join('\n'));

        message.channel.send(embed);
    }
}