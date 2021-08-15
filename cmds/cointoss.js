module.exports = {
    data: {
        name: 'cointoss',
        description: 'Heads or tails'
    },
    aliases: ['heads', 'tails', 'headstails', 'headsortails', 'toss', 'tosscoin'],
    category: 'Miscellaneous',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        let chance = Math.ceil(Math.random() * 2);
        if (chance == 1) {
            message.channel.send('Heads');
        } else if (chance == 2) {
            message.channel.send('Tails');
        }
    }
}