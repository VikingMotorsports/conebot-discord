module.exports = {
    name: 'calendar',
    aliases: [],
    description: 'The team\'s Google calendar',
    usage: '',
    args: false,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://calendar.google.com/calendar?cid=YnZvNnF1N203aGlwbmpoMmw0b2JjNTM2OThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ');
    }
}