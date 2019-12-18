module.exports = {
    name: 'car',
    aliases: ['currentcar'],
    description: 'Google Drive folder of the current car',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/drive/folders/15KhKHIzrcyaZ3_fDRxR463ydJ8VeFDVA?usp=sharing');
    }
}