module.exports = {
    name: 'order',
    aliases: ['buy', 'orderform'],
    description: 'Ordering form',
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://forms.gle/atboeS6sYeMnd5Wu8');
    }
}