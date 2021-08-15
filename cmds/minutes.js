const { minutes } = require('../links.json');

module.exports = {
    data: {
        name: 'minutes',
        description: 'General meeting minutes'
    },
    aliases: ['minute', 'meetingminutes'],
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(minutes);
    }
}