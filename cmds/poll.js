const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    aliases: ['polls', 'vote', 'voting'],
    description: 'Start a poll with up to 9 options',
    args: true,
    usage: '"Question" "option 1" "option 2" "option 3" etc.',
    easteregg: false,
    execute: async (message, args) => {
        // const filter = reaction => {
        //     return ['🇦', '🇧', '🇨', '🇩', '🇪'].includes(reaction.emoji.name) && !message.author.bot;
        // }
        const reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮'];
        const string = message.content.slice(6);
        const regex = /".*?"/g;
        const options = string.match(regex); //! be sure to slice the strings further down the line: String.prototype.slice(1, -1)
        if (!args[0].includes('"')) return message.channel.send('The syntax for polls is `"question" "option 1" "option 2" etc` and you need at least 2 options.');
        if (!options) return message.channel.send('The syntax for polls is `"question" "option 1" "option 2" etc` and you need at least 2 options.');
        const question = options.shift().slice(1, -1);

        if (options.length < 2) return message.channel.send('The syntax for polls is `"question" "option 1" "option 2" etc` and you need at least 2 options.');        
        if (options.length > 9) return message.channel.send('Maximum supported number of options is 5.');

        const Embed = new Discord.RichEmbed()
            .setTitle(question)
            .setColor('#004426')
            .setFooter('Each option will already have at least 1 vote. That is just the bot adding the reaction in.');

        for (const [i, o] of options.entries()) {
            Embed.addField(reactions[i], o.slice(1, -1));
        }

        // message.delete();
        const poll = await message.client.channels.get('651979439487320075').send('@everyone', {embed: Embed});
        for (let i = 0; i < options.length; i++) {
            await poll.react(reactions[i]);
        }
    }
}