module.exports = {
    name: 'roster',
    aliases: ['members'],
    description: 'Team roster spreadsheet',
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://docs.google.com/spreadsheets/d/1oAA0A94sH4sT4McsMROo1ZOdQ69Ab0tYIz6JH9Yvff4/edit?usp=sharing');
    }
}