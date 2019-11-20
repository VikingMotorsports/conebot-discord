const Discord = require('discord.js');
const axios = require('axios');
const Url = 'http://nyanpass.com/add.php';
const Header = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
const Form = 'nyan=pass';

module.exports = {
    name: 'nyanpasu',
    aliases: ['nyanpass'],
    description: 'Nyanpasu~',
    execute(message, args) {
        axios({
                method: 'post',
                url: Url,
                headers: Header,
                data: Form
            })
            .then(res => {
                const embed = new Discord.RichEmbed()
                    .setThumbnail('https://i.imgur.com/E83gsQh.jpg')
                    .setTitle('Current Nyanpasu Count')
                    .setColor('#96031A')
                    .setDescription(`${res.data.cnt}`)
                    .setFooter('http://nyanpass.com/|Nyanpasu');

                message.channel.send(embed);
            }).catch(console.error);
    }
}