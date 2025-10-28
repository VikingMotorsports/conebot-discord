const { website, youtube, instagram, facebook } = require('../links.json');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('socialmedia')
    .setDescription('Shows VMS social media links'),
  aliases: [
    'media',
    'youtube',
    'instagram',
    'facebook',
    'website',
    'site',
    'insta',
    'yt',
    'fb',
  ],
  category: 'Team',
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
    .setTitle('Viking Motorsports Social Media')
    .setColor('#004426')
    .addField('Website', website)
    .addField('YouTube', youtube)
    .addField('Facebook', facebook)
    .addField('Instagram', instagram);

  return { embeds: [embed] };
}
