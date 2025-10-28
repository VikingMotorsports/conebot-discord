const fs = require('fs');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('soda')
    .setDescription('Keep track of soda intake and leaderboard')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('leaderboard')
        .setDescription('Show the soda intake leaderboard')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('drink')
        .setDescription('Add sodas to the tracker')
        .addIntegerOption((option) =>
          option
            .setName('amount')
            .setDescription('How many you drank. Defaults to 1 if not defined')
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('reset').setDescription('Resets the tracker')
    ),
  aliases: ['sodatracker', 'drink'],
  category: 'Miscellaneous',
  showInHelp: true,
  args: false,
  usage: 'drink <integer(optional)>',
  easteregg: true,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    if (!args.length) {
      return await showLeaderboard();
    }
    try {
      if (args.length && args[0] === 'drink') {
        const member = message.member;
        const amount = parseInt(args[1]) || 1;
        return await drink(member, amount);
      }
      if (args.length && args[0] === 'reset') {
        return await reset();
      }
    } catch (error) {
      console.error(error);
    }
  },
  interact: async (interaction) => {
    const subCommand = interaction.options.getSubcommand();
    let amount = interaction.options.getInteger('amount');
    const member = interaction.member;
    if (amount === null) amount = 1;

    if (subCommand === 'leaderboard')
      interaction.reply(await showLeaderboard());
    if (subCommand === 'drink') interaction.reply(await drink(member, amount));
    if (subCommand === 'reset') interaction.reply(await reset());
  },
};

async function showLeaderboard() {
  const sodas = JSON.parse(fs.readFileSync('./soda.json', 'utf-8'));
  if (!sodas.length) return 'Soda leaderboard empty... Start drinking!';

  const sortedSodas = sodas.slice(0).sort((a, b) => {
    return b.sodas - a.sodas;
  });

  let leaderboard = '';
  for (const d of sortedSodas) leaderboard += `${d.sodas} - ${d.name}\n`;

  const totalSodas = sortedSodas.map((s) => s.sodas).reduce((a, b) => a + b);
  const totalLiters = totalSodas * 0.355;

  const leaderboardEmbed = new Discord.MessageEmbed()
    .setTitle('Soda Leaderboard')
    .setColor('#96031A')
    .setDescription(leaderboard.slice(0, -1))
    .addField(
      'Total Volume',
      `The team has collectively drank ${totalLiters.toFixed(2)} liters.`
    )
    .setFooter('Based on average volume of 355 mL per drink');

  return { embeds: [leaderboardEmbed] };
}

/**
 *
 * @param {collection} member member object from Discord
 * @param {number} amount number of sodas drank
 * @returns reply object
 */
async function drink(member, amount = 1) {
  if (amount < 1) return { content: "You can't do that!", ephemeral: true };
  const sodaJSON = JSON.parse(fs.readFileSync('./soda.json', 'utf-8'));
  const memberId = member.id;
  const memberName = member.nickname ? member.nickname : member.user.username;
  const objIndex = sodaJSON.findIndex((o) => o.id === memberId);

  if (objIndex === -1) {
    let sodas = 0;
    let reply = '';

    if (amount === 1) {
      sodas += 1;
      reply = `${memberName} drank a soda. They have drank a total of 0.35 liters.`;
    }
    if (amount > 1) {
      sodas += amount;
      reply = `${memberName} drank ${amount} sodas. They have drank a total of ${(sodas * 0.355).toFixed(2)} liters.`;
    }
    const memberSoda = {
      id: memberId,
      name: memberName,
      sodas: sodas,
    };
    sodaJSON.push(memberSoda);

    fs.writeFile('./soda.json', JSON.stringify(sodaJSON, null, '\t'), (err) => {
      if (err) console.error(err);
    });
    return reply;
  }
  if (objIndex >= 0) {
    let sodas = sodaJSON[objIndex].sodas;
    let reply;

    if (amount === 1) {
      sodas += 1;
      reply = `${memberName} drank a soda. They have drank a total of ${(sodas * 0.355).toFixed(2)} liters.`;
    }
    if (amount > 1) {
      sodas += amount;
      reply = `${memberName} drank ${amount} sodas. They have drank a total of ${(sodas * 0.355).toFixed(2)} liters.`;
    }
    const memberSoda = {
      id: memberId,
      name: memberName,
      sodas: sodas,
    };
    const updatedSodas = [
      ...sodaJSON.slice(0, objIndex),
      memberSoda,
      ...sodaJSON.slice(objIndex + 1),
    ];

    fs.writeFile(
      './soda.json',
      JSON.stringify(updatedSodas, null, '\t'),
      (err) => {
        if (err) console.error(err);
      }
    );
    return reply;
  }
}

async function reset() {
  fs.writeFile('./soda.json', JSON.stringify([]), (err) => {
    if (err) console.error(err);
  });
  return 'Soda tracker has been reset. Start drinking!';
}
