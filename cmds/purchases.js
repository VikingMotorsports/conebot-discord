module.exports = {
    name: 'purchases',
    aliases: ['orders', 'orderstatus'],
    description: 'Spreadsheet outlining purchasing information and status',
    category: 'Purchases',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://docs.google.com/spreadsheets/d/1foRs7HG7IAdPQQtUUTuEsM_zbJ1CAelHVW5_Qcfe9v8/edit?usp=sharing');
    }
}