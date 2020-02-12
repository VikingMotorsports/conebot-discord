module.exports = {
    name: 'rules',
    description: 'Link to FSAE rule book',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://www.fsaeonline.com/cdsweb/gen/DownloadDocument.aspx?DocumentID=1b6bda52-48d0-4286-931d-c9418165fd3e');
    }
}