const { license } = require("../links.json");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("license")
    .setDescription("Form to submit a request for a Solidworks license key"),
  aliases: ["licenseRequest", "licenserequest", "request", "solidworks"],
  category: "Team",
  showInHelp: true,
  easteregg: false,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    return license;
  },
  interact: async (interaction) => {
    interaction.reply(license);
  },
};
