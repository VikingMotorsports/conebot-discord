module.exports = {
    name: 'drive',
    aliases: ['googledrive'],
    description: 'Main Google Drive folder',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/drive/folders/0B5z09FdfsPYJUjB2bG5qNFNwTzA?usp=sharing');
    }
}