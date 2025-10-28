const { prefix } = require("../config.json");
const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "List of commands the bot can perform or info about a specific command",
    )
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Get detailed help on a specific command")
        .setRequired(false),
    ),
  aliases: ["commands"],
  usage: "<command name>",
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    if (!args.length) {
      return await showFullHelp(bot.commands);
    } else if (args.length == 1) {
      return await showDetailedHelp(bot.commands, args[0]);
    }
  },
  interact: async (interaction) => {
    const command = interaction.options.getString("command");
    if (command !== null) {
      interaction.reply(
        await showDetailedHelp(interaction.client.commands, command),
      );
      return;
    }
    interaction.reply(await showFullHelp(interaction.client.commands));
  },
};

/**
 *
 * @param {collection} commands Commands collection set in the client
 * @returns reply object
 */
async function showFullHelp(commands) {
  const categorizedCmds = {};

  commands.each((c) => {
    if (c.showInHelp) {
      if (!categorizedCmds[c.category]) {
        categorizedCmds[c.category] = [];
      }
      let text = `${prefix}${c.data.name}`;
      if (c.throughLinksCommand) {
        text += " (through links slash command)";
      }
      categorizedCmds[c.category].push(text);
    }
  });

  let categoryKeys = Object.keys(categorizedCmds);
  categoryKeys.push(
    categoryKeys.splice(categoryKeys.indexOf("Miscellaneous"), 1)[0],
  );

  const allCmds = new Discord.MessageEmbed()
    .setTitle("All available commands")
    .setDescription(
      `Type ${prefix}help <command name> to get info on a specific command.\n`,
    )
    .setColor("#004426");

  for (const c of categoryKeys) {
    allCmds.addField(c, categorizedCmds[c].join("\n"));
  }

  return { embeds: [allCmds] };
}

/**
 *
 * @param {collection} commands Commands collection set in the client
 * @param {string} commandHelp Command string to get detailed help for
 * @returns reply object
 */
async function showDetailedHelp(commands, commandHelp) {
  let name = commandHelp;
  if (name.startsWith(prefix)) name = name.slice(prefix.length);
  const command =
    commands.get(name) ||
    commands.find((c) => c.aliases && c.aliases.includes(name));

  if (!command) return "Command does not exist.";

  const detailedHelp = new Discord.MessageEmbed().setColor("#004225");

  if (command.aliases)
    detailedHelp.addField("Aliases", command.aliases.join(", "));
  if (command.isSlashCommand)
    detailedHelp.setFooter("This command is also a slash command.");
  if (command.description) detailedHelp.setDescription(command.description);
  if (command.usage)
    detailedHelp.setTitle(`${prefix}${command.data.name} ${command.usage}`);
  else if (!command.usage)
    detailedHelp.setTitle(`${prefix}${command.data.name}`);

  return { embeds: [detailedHelp] };
}
