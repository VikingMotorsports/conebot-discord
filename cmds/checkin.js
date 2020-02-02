module.exports = {
    name: 'checkin',
    aliases: [],
    description: 'Form to check in to meetings and events',
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('Check in to meetings, workshops, and events here:\nhttps://forms.gle/CJAxTvXG2pnG9C9A8');
    }
}