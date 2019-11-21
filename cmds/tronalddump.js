const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'tronaldump',
    aliases: ['tronald', 'dump', 'trump', 'donald', 'donaltrump'],
    description: 'Inspirational quotes from Our Great President',
    args: true,
    execute(message, args) {
        if (args[0] === 'random') {
            axios({
                method: 'get',
                url: 'https://api.tronalddump.io/random/quote',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res => {
                const payload = res.data;
                const embed = new Discord.RichEmbed()
                    .setTitle(`${payload.value}`)
                    .setDescription(`- ${payload._embedded.author[0].name}`)
                    .addField('Source', `${payload._embedded.source[0].url}`)
                    .setFooter('Powered by https://tronalddump.io/');

                message.channel.send(embed);
            }).catch(console.error);
        } else {
            const arguments = args.splice(0, 1).join(' ');
            var parseArgs;
            if (arguments.includes(' ')) {
                parseArgs = arguments.replace(/\s/g, '+');
            } else {
                parseArgs = arguments;
            }

            axios({
                method: 'get',
                url: `https://api.tronalddump.io/search/quote?query=${parseArgs}`,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res => {
                const payload = res.data;
                if (payload.count > 0) {
                    let rand = Math.floor(Math.random() * payload.count);
                    let quote = payload._embedded.quotes[rand].value;
                    let author = payload._embedded.quotes[rand]._embedded.author[0].name;
                    let source = payload._embedded.quotes[rand]._embedded.source[0].url;

                    const embed = new Discord.RichEmbed()
                        .setTitle(quote)
                        .setDescription(`- ${author}`)
                        .addField('Source', source)
                        .setFooter('Powered by https://www.tronalddump.io/');

                    message.channel.send(embed);
                }
            }).catch(console.error);
        }
    }
}