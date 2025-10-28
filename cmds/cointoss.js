const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cointoss')
    .setDescription('Heads or tails'),
  aliases: ['heads', 'tails', 'headstails', 'headsortails', 'toss', 'tosscoin'],
  category: 'Miscellaneous',
  showInHelp: true,
  easteregg: false,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    return await headsOrTails();
  },
  interact: async (interaction) => {
    interaction.reply(await headsOrTails());
  },
};

async function headsOrTails() {
  const chance = Math.floor(Math.random() * 2);
  if (chance === 0) return 'Heads';
  if (chance === 1) return 'Tails';
}
