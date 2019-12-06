const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Start a poll with up to 9 options, with results collected after the defined time in minutes',
    args: true,
    usage: '<minutes to wait> "Question" "option 1" "option 2" etc.',
    easteregg: false,
    execute: async (message, args) => {
        const reactionsPoll = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        const filter = (reaction, user) => reactionsPoll.includes(reaction.emoji.name);

        const string = message.content.slice(6);
        const regex = /".*?"/g;
        const options = string.match(regex); //! be sure to slice the strings further down the line: String.prototype.slice(1, -1)
        if (isNaN(args[0])) return message.channel.send('The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (!args[1].includes('"')) return message.channel.send('The syntax for polls is `<minutes to wait> "question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (!options) return message.channel.send('The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.');
        const question = options.shift().slice(1, -1);
        if (options.length < 2) return message.channel.send('The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (options.length > 9) return message.channel.send('Maximum supported number of options is 9.');

        const Embed = new Discord.RichEmbed()
            .setTitle(question)
            .setDescription(`Results will be collected ${args[0]} minute(s) after this poll is created.`)
            .setColor('#004426')
            .setFooter('Each option will already have at least 1 vote. That is just the bot adding the reaction in.');

        for (const [i, o] of options.entries()) {
            Embed.addField(reactionsPoll[i], o.slice(1, -1));
        }

        // message.delete();
        const poll = await message.client.channels.get('651979439487320075').send('@everyone', {
            embed: Embed
        });
        for (let i = 0; i < options.length; i++) {
            await poll.react(reactionsPoll[i]);
        }

        poll.awaitReactions(filter, {
            time: args[0] * 60000
        }).then((collected) => {
            // console.log(`Message has ${poll.reactions.size} reactions`);

            const resultsEmbed = new Discord.RichEmbed().setTitle('Poll results').setDescription(question).setColor('#004426');
            for (let i = 0; i < poll.reactions.size; i++) {
                resultsEmbed.addField(poll.reactions.get(reactionsPoll[i]).emoji.name, poll.reactions.get(reactionsPoll[i]).count - 1);
            }

            message.channel.client.channels.get('651979439487320075').send('@everyone', {
                embed: resultsEmbed
            });
        }).catch(err => console.log(err));
    }
}