/**
 * @file Working document for design logs of the car.
 *
 * Prefix command:
 * <prefix>designlog         Return link.
 */

const { designlog } = require('../../links.json');

module.exports = {
    data: {
        name: 'designlog',
        description: 'Working document for design logs of the car',
    },
    aliases: ['log'],
    category: 'Car',
    showInHelp: true,
    easteregg: false,
    throughLinksCommand: true,
    execute: async (_bot, _message, _args) => {
        return designlog || 'error: field unset';
    },
};
