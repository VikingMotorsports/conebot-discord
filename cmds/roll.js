const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll XdY dice where X is number of dice and Y is type of dice'),
    aliases: ['rolldice', 'diceroll', 'dice'],
    category: 'Miscellaneous',
    showInHelp: true,
    easteregg: false,
    usage: 'XdY',
    args: true,
    execute: async (bot, message, args) => {
        if (args[0].match(/\dd\d/)) {
            let numDice = parseInt(args[0].split('d')[0]);
            let diceType = parseInt(args[0].split('d')[1]);
            let min = Math.ceil(numDice);
            let max = Math.floor(numDice * diceType);
            let num = Math.floor(Math.random() * (max - min + 1) + min);
            if (num === 69) {
                message.channel.send(`${num}...Nice`);
            } else {
                message.channel.send(num);
            }
        } else {
            if (args[0].match(/d\d/)) {
                let diceType = parseInt(args[0].split('d')[1]);
                let num = Math.floor(Math.random() * diceType) + 1;
                message.channel.send(`${num}\nBut please, is it really that hard to follow the syntax?`);

            } else {
                message.channel.send('Please follow the syntax.');
            }
        }
    }
}