const {
  inventoryDocumentation,
  inventoryList,
  inventoryForm,
  wiresInventory,
} = require("../links.json");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Show inventory list, check in/out, and documentation"),
  category: "Team",
  args: false,
  showInHelp: true,
  easteregg: false,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    return await embedBuilder();
  },
  interact: async (interaction) => {
    interaction.reply(await embedBuilder());
  },
};

async function embedBuilder() {
  const embed = new MessageEmbed()
    .setTitle("VMS Inventory")
    .setColor("#004426")
    .setDescription(
      "Please read the documentation before using the check in/out form.",
    )
    .addField("Documentation", inventoryDocumentation)
    .addField("List", inventoryList)
    .addField("Cable Inventory", wiresInventory)
    .addField("Check in/out", inventoryForm);

  return { embeds: [embed] };
}
