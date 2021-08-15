const { gantt } = require('../links.json');

module.exports = {
    data: {
        name: 'gantt',
        description: 'Overall timeline of vehicle projects'
    },
    aliases: ['ganttchart', 'timeline'],
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(gantt);
    }
}