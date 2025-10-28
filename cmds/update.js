// const fs = require('fs').promises;
const fs = require('fs');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const updatableParameters = ['competition', 'prefix', 'currentPurchaseSheet'];
const { leadershipRoleId } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Update bot parameters')
    .addStringOption((option) =>
      option
        .setName('parameter')
        .setDescription('Select parameter to update')
        .setRequired(true)
        .addChoices([
          ['Competition Date', 'competition'],
          ['Bot Prefix', 'prefix'],
          ['Current Purchases Sheet', 'currentPurchaseSheet'],
        ])
    )
    .addStringOption((option) =>
      option
        .setName('value')
        .setDescription('Value to update the parameter to')
        .setRequired(true)
    ),
  category: 'Server Moderation',
  usage: '<parameter> <new value>',
  args: true,
  showInHelp: true,
  easteregg: false,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    const leadershipRole = message.guild.roles.cache.find(
      (r) => r.name === 'Leadership'
    );
    // if (!message.member.roles.cache.has(leadershipRole.id)) return 'Not allowed.'
    return await updateParameter(
      leadershipRole,
      message.member,
      args[0],
      args.slice(1).join(' ')
    );

    // try {
    //     if (!updatableParameters.includes(args[0])) return console.log('That parameter is not updatable.');

    //     const data = await fs.readFile('./config.json');
    //     let config = JSON.parse(data);
    //     const newValue = args.slice(1);

    //     config[args[0]] = newValue.join(' ');

    //     fs.writeFile('./config.json', JSON.stringify(config, null, '\t'));

    //     return 'Parameter updated.'
    // } catch (error) {
    //     console.error(error);
    // }
  },
  interact: async (interaction) => {
    const leadershipRole = interaction.guild.roles.cache.find(
      (r) => r.name === 'Leadership'
    );
    const parameter = interaction.options.getString('parameter');
    const value = interaction.options.getString('value');

    try {
      interaction.reply(
        await updateParameter(
          leadershipRole,
          interaction.member,
          parameter,
          value
        )
      );
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: `Error executing command:\n${codeBlock('js', error)}`,
        ephemeral: true,
      });
    }
  },
};

async function updateParameter(
  leadershipRole,
  member,
  parameter,
  updatedValue
) {
  if (!member.roles.cache.has(leadershipRole.id)) return 'Not allowed.';
  if (!updatableParameters.includes(parameter))
    return 'That parameter is not updatable.';

  const configFile = fs.readFileSync('./config.json', 'utf-8');
  const config = JSON.parse(configFile);
  config[parameter] = updatedValue;

  fs.writeFile('./config.json', JSON.stringify(config, null, '\t'), (err) => {
    if (err) console.error(err);
  });
  return {
    content: `Parameter \`${parameter}\` updated to ${updatedValue}`,
    ephemeral: true,
  };
}
