module.exports = {
    name: 'checkin',
    description: 'Form to check in to meetings and events',
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    args: false,
    execute: async (bot, message, args) => {
        message.channel.send('Check in to meetings, workshops, and events here:\nhttps://forms.gle/CJAxTvXG2pnG9C9A8');
    }
}