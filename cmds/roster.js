module.exports = {
    name: 'roster',
    aliases: ['members'],
    description: 'Team roster spreadsheet',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/open?id=1oAA0A94sH4sT4McsMROo1ZOdQ69Ab0tYIz6JH9Yvff4');
    }
}