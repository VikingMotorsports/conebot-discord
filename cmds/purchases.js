module.exports = {
    name: 'purchases',
    aliases: ['orders', 'orderstatus'],
    description: 'Spreadsheet outlining purchasing information and status',
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/open?id=1foRs7HG7IAdPQQtUUTuEsM_zbJ1CAelHVW5_Qcfe9v8');
    }
}