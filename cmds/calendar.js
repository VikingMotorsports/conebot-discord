module.exports = {
    name: 'calendar',
    aliases: [],
    description: 'The team\'s Google calendar',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://calendar.google.com/calendar/b/1?cid=cGR4LmVkdV9oYjV0b3RpczR0cTNlZTNxbjQ4YjE4cXE1b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t');
    }
}