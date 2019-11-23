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
    easteregg: true,
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
                    .setURL('http://nyanpass.com/')
                    .setColor('#96031A')
                    .setDescription(`${res.data.cnt}`)
                    .setFooter('http://nyanpass.com/');

                message.channel.send(embed);
            }).catch(console.error);
    }
}