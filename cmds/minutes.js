module.exports = {
    name: 'minutes',
    aliases: ['minute', 'meetingminutes'],
    description: 'General meeting minutes',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/drive/folders/1DtEyOe1PY7Bi66iKGPKAdWP1HNQEU_NG?usp=sharing');
    }
}