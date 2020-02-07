module.exports = {
    name: 'gantt',
    aliases: ['ganttchart', 'timeline'],
    description: 'Overall timeline of vehicle projects',
    usage: '',
    args: false,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/open?id=1C6hcbUhzNp_-X7UI8um5hBjRnKeIVMf4zPIrZCQaRok');
    }
}