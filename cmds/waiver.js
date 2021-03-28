const { MessageEmbed } = require('discord.js');
const { liability, photoRelease } = require('../links.json');

module.exports = {
    name: 'waiver',
    aliases: ['liability', 'release', 'waivers'],
    description: 'Links to VMS liability waivers',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        const embed = new MessageEmbed().setTitle('VMS Waivers').setColor('#004426')
            .addField('Liability Waiver', liability)
            .addField('Photo Release', photoRelease);

        message.channel.send(embed);
    }
}