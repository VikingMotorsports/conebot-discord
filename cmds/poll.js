const Discord = require('discord.js');
const { pollsChannel } = require('../config.json');
const fs = require('fs');

const reactionsPoll = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = {
    data: {
        name: 'poll',
        description: 'Start a poll with up to 10 options, with results collected after the defined time in minutes'
    },
    category: 'Server Moderation',
    showInHelp: true,
    args: true,
    usage: '<minutes to wait> "Question" "option 1" "option 2" etc.',
    easteregg: false,
    execute: async (bot, message, args) => {
        const string = message.content.slice(6);
        const regex = /".*?"/g;
        const options = string.match(regex); //! be sure to slice the strings further down the line: String.prototype.slice(1, -1)
        if (isNaN(args[0])) return message.channel.send('The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (!args[1].includes('"')) return message.channel.send('The syntax for polls is `<minutes to wait> "question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (!options) return message.channel.send('The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.');
        const question = options.shift().slice(1, -1);
        if (options.length < 2) return message.channel.send('The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (options.length > 10) return message.channel.send('Maximum supported number of options is 10.');
        const optionsSliced = [];
        for (const i of options) optionsSliced.push(i.slice(1, -1));


        // const date = Date.now + parseInt(args[0]) * 60000;
        const date = new Date(Date.now() + parseInt(args[0]) * 60000);
        // const year = date.getFullYear();
        // const month = date.getMonth();
        // const day = date.getDate();
        // const hour = date.getHour();
        // const minute = date.getMinutes();

        const Embed = new Discord.MessageEmbed()
            .setTitle(question)
            // .setDescription(`Results will be collected on ${year}/${month}/${day} ${hour}:${minute}.\n­`)
            .setDescription(`Results will be collected on ${date.toLocaleString('en-US')}`)
            .setColor('#004426')
            .setFooter('Each option will already have at least 1 vote. That is just the bot adding the reaction in.');

        for (const [i, o] of optionsSliced.entries()) {
            Embed.addField(`${reactionsPoll[i]} - ${o}`, '­');
        }

        const poll = await message.client.channels.cache.get(pollsChannel).send('@everyone', {
            embed: Embed
        });
        for (let i = 0; i < options.length; i++) {
            await poll.react(reactionsPoll[i]);
        }

        //* writes deadline of poll to file
        bot.polls[poll.id] = {
            time: Date.now() + parseInt(args[0]) * 60000,
            question: question,
            options: optionsSliced
        };
        fs.writeFile('./polls.json', JSON.stringify(bot.polls, null, '\t'), err => {
            if (err) return console.error(err);
        });
    },
    result: async (bot, message, question, option) => {
        // const question = message.embeds[0].title;

        const resultsEmbed = new Discord.MessageEmbed().setTitle('Poll results').setDescription(question).setColor('#004426');
        for (let i = 0; i < option.length; i++) {
            resultsEmbed.addField(`${message.reactions.cache.get(reactionsPoll[i]).emoji.name} - ${option[i]}`, message.reactions.cache.get(reactionsPoll[i]).count - 1);
        }
        try {
            bot.channels.cache.get(pollsChannel).send('@everyone', { embed: resultsEmbed });
        } catch (error) {
            console.error(error);
        }
    }
}