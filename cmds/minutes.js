const { minutes } = require('../links.json');

module.exports = {
    name: 'minutes',
    aliases: ['minute', 'meetingminutes'],
    description: 'General meeting minutes',
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(minutes);
    }
}