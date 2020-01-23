module.exports = {
    name: 'reference',
    aliases: ['lightreading', 'read', 'documents'],
    description: 'Reference documents folder',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/open?id=1HdoVbxl1wjDaC678g_t-uE_FuSaUePh1');
    }
}