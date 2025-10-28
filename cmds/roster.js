const { roster } = require('../links.json');

module.exports = {
  data: {
    name: 'roster',
    description: 'Team roster spreadsheet',
  },
  aliases: ['members'],
  category: 'Team',
  showInHelp: true,
  easteregg: false,
  args: false,
  throughLinksCommand: true,
  execute: async (bot, message, args) => {
    return roster;
  },
};
