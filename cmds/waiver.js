const { MessageEmbed } = require('discord.js');
const { liability, photoRelease } = require('../links.json');

module.exports = {
    data: {
        name: 'waiver',
        description: 'Links to VMS liability waivers'
    },
    aliases: ['liability', 'release', 'waivers'],
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        const embed = new MessageEmbed().setTitle('VMS Waivers').setColor('#004426')
            .setDescription('When completed, submit these waivers through this form https://forms.gle/EdmLFKwKcqSereph8')
            .addField('Liability Waiver', liability)
            .addField('Photo Release', photoRelease);

        message.channel.send(embed);
    }
}