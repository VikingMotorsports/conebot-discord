module.exports = {
    name: 'rules',
    description: 'Link to FSAE rule book',
    easteregg: false,
    execute(message, args) {
        message.channel.send('http://fsaeonline.com/cdsweb/gen/DownloadDocument.aspx?DocumentID=607667ea-bec6-4658-92c4-fff59dbb5c0e');
    }
}