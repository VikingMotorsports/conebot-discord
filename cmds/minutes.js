/**
 * @file General meeting minutes.
 *
 * Prefix command:
 * <prefix>minutes           Return link.
 */

const { minutes } = require('../links.json');

module.exports = {
    data: {
        name: 'minutes',
        description: 'General meeting minutes',
    },
    aliases: ['minute', 'meetingminutes'],
    category: 'Meetings/Events',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return minutes || 'error: field unset';
    },
};
