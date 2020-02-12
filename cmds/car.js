module.exports = {
    name: 'car',
    aliases: ['currentcar'],
    description: 'Google Drive folder of collaboration documents for the current car',
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/drive/folders/1bS3yWJH3jHL06GDuj7j8uVTVIzbOMzHl?usp=sharing');
    }
}