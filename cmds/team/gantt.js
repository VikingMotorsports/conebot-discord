/**
 * @file Overall timeline of vehicle projects.
 *
 * Prefix command:
 * <prefix>gantt         Return link.
 */

const { gantt } = require('../../links.json');

module.exports = {
    data: {
        name: 'gantt',
        description: 'Overall timeline of vehicle projects',
    },
    aliases: ['ganttchart', 'timeline'],
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return gantt || 'error: field unset';
    },
};
