module.exports = {
    name: 'library',
    aliases: ['lightreading', 'read', 'documents', 'reference'],
    description: 'Reference documents folder',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/drive/folders/1HdoVbxl1wjDaC678g_t-uE_FuSaUePh1?usp=sharing');
    }
}