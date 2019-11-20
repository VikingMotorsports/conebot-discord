const Discord = require('discord.js');

module.exports = {
    name: 'eastereggs',
    aliases: ['easteregg', 'random'],
    description: 'List of easter eggs',
    execute(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle('Easter eggs')
            .setColor('#96031A')
            .setDescription('!bored\n!joke\n!nyanpasu\n!yesno\n!inspiration\n!fuckoff\n!fuckall\n!kanye\ntronalddump <random||topic>');

        message.channel.send(embed);
    }
}