const Discord = require('discord.js');
const {
    prefix
} = require('../config.json');

module.exports = {
    name: 'eastereggs',
    aliases: ['easteregg', 'random'],
    description: 'List of easter eggs',
    easteregg: true,
    execute(message, args) {
        const {
            commands
        } = message.client;
        let EE = [];
        const easterArray = commands.map(c => {
            if (c.easteregg) {
                EE.push(`${prefix}${c.name}`);
                // return c.name
            }
        });
        // easterArray.forEach(easter => {
        //     if (easter != undefined) EE.push(`${prefix}${easter}`);
        // });

        const embed = new Discord.RichEmbed()
            .setTitle('Easter eggs')
            .setColor('#96031A')
            // .setDescription('!bored\n!joke\n!nyanpasu\n!yesno\n!inspiration\n!fuckoff\n!fuckall\n!kanye\n!tronalddump');
            .setDescription(EE.join('\n'));

        message.channel.send(embed);
    }
}