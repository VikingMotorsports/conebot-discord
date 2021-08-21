const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    data: {
        name: 'nyanpasu',
        description: 'Nyanpasu~'
    },
    aliases: ['nyanpass'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        const Url = 'http://nyanpass.com/add.php';
        const Header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const Form = 'nyan=pass';

        try {
            const response = await axios({
                method: 'post',
                url: Url,
                headers: Header,
                data: Form
            });
            const embed = new Discord.RichEmbed()
                .setThumbnail('https://i.imgur.com/E83gsQh.jpg')
                .setTitle('Current Nyanpasu Count')
                .setURL('http://nyanpass.com')
                .setColor('#96031A')
                .setDescription(response.data.cnt)
                .setFooter('http://nyanpass.com');

            // message.channel.send(embed);
            return { embeds: [embed] };
        } catch (error) {
            console.error(error);
        }
    }
}