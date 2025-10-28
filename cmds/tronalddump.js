const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  data: {
    name: 'tronaldump',
    description: 'Inspirational quotes from Our Great President',
  },
  aliases: ['tronald', 'dump', 'trump', 'donald', 'donaltrump'],
  showInHelp: false,
  easteregg: true,
  usage: 'random or [topic]',
  args: true,
  execute: async (bot, message, args) => {
    if (args[0] === 'random') {
      try {
        const res = await axios({
          method: 'get',
          url: 'https://api.tronalddump.io/random/quote',
          headers: {
            Accept: 'application/json',
          },
        });
        const embed = new Discord.MessageEmbed()
          .setTitle(res.data.value)
          .setDescription(`- ${res.data._embedded.author[0].name}`)
          .setColor('#96031A')
          .addField('Source', res.data._embedded.source[0].url)
          .setFooter('Powered by https://tronalddump.io/');

        return { embeds: [embed] };
      } catch (error) {
        console.error(error);
      }
    } else {
      const arguments = args.splice(0, 1).join(' ');
      var parseArgs;
      if (arguments.includes(' ')) {
        parseArgs = arguments.replace(/\s/g, '+');
      } else {
        parseArgs = arguments;
      }

      try {
        const res = await axios({
          method: 'get',
          url: `https://api.tronalddump.io/search/quote?query=${parseArgs}`,
          headers: {
            Accept: 'application/json',
          },
        });
        if (res.data.count > 0) {
          let rand = Math.floor(Math.random() * res.data.count);
          let quote = res.data._embedded.quotes[rand].value;
          let author = res.data._embedded.quotes[rand]._embedded.author[0].name;
          let source = res.data._embedded.quotes[rand]._embedded.source[0].url;

          const embed = new Discord.MessageEmbed()
            .setTitle(quote)
            .setDescription(`- ${author}`)
            .setColor('#96031A')
            .addField('Source', source)
            .setFooter('Powered by https://www.tronalddump.io/');

          return { embeds: [embed] };
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
};
