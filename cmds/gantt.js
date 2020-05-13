const { gantt } = require('../links.json');

module.exports = {
    name: 'gantt',
    aliases: ['ganttchart', 'timeline'],
    description: 'Overall timeline of vehicle projects',
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(gantt);
    }
}