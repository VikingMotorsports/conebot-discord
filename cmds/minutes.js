module.exports = {
    name: 'minutes',
    aliases: ['minute', 'meetingminutes'],
    description: 'General meeting minutes',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/open?id=1Jh2gpNzTYzdzJKZdJORXLCk9T0eomwkm');
    }
}