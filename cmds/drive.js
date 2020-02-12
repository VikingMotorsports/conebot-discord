module.exports = {
    name: 'drive',
    aliases: ['googledrive'],
    description: 'Main Google Drive folder',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/drive/folders/1y8vqZuBGnaYx3g-Vm1QyRO2sKkFkBYcl?usp=sharing');
    }
}