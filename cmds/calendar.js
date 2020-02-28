module.exports = {
    name: 'calendar',
    aliases: [],
    description: 'The team\'s Google calendar',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://sites.google.com/pdx.edu/viking-motorsports/calendar?authuser=0');
    }
}