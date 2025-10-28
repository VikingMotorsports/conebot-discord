const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription(
      "Roll XdY dice where X is number of dice and Y is type of dice",
    )
    .addStringOption((option) =>
      option
        .setName("dice")
        .setDescription("Dice to roll (XdY)")
        .setRequired(true),
    )
    .addBooleanOption((option) =>
      option
        .setName("verbose")
        .setDescription("Set to true to return value of each rolled die"),
    ),
  aliases: ["rolldice", "diceroll", "dice"],
  category: "Miscellaneous",
  showInHelp: true,
  easteregg: false,
  usage: "XdY",
  args: true,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    if (["v", "verbose"].includes(args[1])) return await rollVerbose(args[0]);
    return await roll(args[0]);
  },
  interact: async (interaction) => {
    const dice = interaction.options.getString("dice");
    const verbose = interaction.options.getBoolean("verbose");

    let result;
    if (verbose) result = await rollVerbose(dice);
    else result = await roll(dice);
    interaction.reply(result);
  },
};

async function roll(dice) {
  if (!dice.match(/^[1-9]\d*d[1-9]\d*$/))
    return {
      content:
        "Please follow the syntax XdY, where X is number of dice and y is type of die.",
      ephemeral: true,
    };

  const numDice = parseInt(dice.split("d")[0]);
  const diceType = parseInt(dice.split("d")[1]);

  let diceRolls = [];
  for (let i = 0; i < numDice; i++) {
    const roll = Math.ceil(Math.random() * diceType);
    diceRolls.push(roll);
  }
  const total = diceRolls.reduce((a, b) => {
    return a + b;
  }, 0);

  if (total === 69) return `${total}...nice`;
  return total.toString();
}

async function rollVerbose(dice) {
  if (!dice.match(/^[1-9]\d*d[1-9]\d*$/))
    return {
      content:
        "Please follow the syntax XdY, where X is number of dice and y is type of die.",
      ephemeral: true,
    };

  const numDice = parseInt(dice.split("d")[0]);
  const diceType = parseInt(dice.split("d")[1]);

  let diceRolls = [];
  for (let i = 0; i < numDice; i++) {
    const roll = Math.ceil(Math.random() * diceType);
    diceRolls.push(roll);
  }
  const total = diceRolls.reduce((a, b) => {
    return a + b;
  }, 0);

  if (total === 69) return `${diceRolls.join(" + ")} = ${total}...nice`;
  return `${diceRolls.join(" + ")} = ${total}`;
}
