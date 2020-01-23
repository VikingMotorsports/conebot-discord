module.exports = {
    name: 'car',
    aliases: ['currentcar'],
    description: 'Google Drive folder of the current car',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/open?id=1bS3yWJH3jHL06GDuj7j8uVTVIzbOMzHl');
    }
}