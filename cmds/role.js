const Discord = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const leadershipRoles = [
  'Department',
  'Leadership',
  'Subsystem Lead',
  'Shop Manager',
  'IT Manager',
  'Server Developer',
];
const miscRoles = [
  'Cone Bot',
  'Member',
  'Bot',
  'Overlord',
  '@everyone',
  'Admin',
  'Server Booster',
  'Rythm',
];
const barredRoles = leadershipRoles.concat(miscRoles);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Add or remove your roles on the server')
    .addStringOption((option) =>
      option
        .setName('command')
        .setDescription('Do you want to add or remove a role?')
        .setRequired(true)
        .addChoices([
          ['Add', 'add'],
          ['Remove', 'remove'],
          ['Assign (Leadership only - requires target)', 'assign'],
          ['Unassign (Leadership only - requires target)', 'unassign'],
        ])
    )
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('The role to add or remove')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription(
          'Target member to (un)assign a role to/from (Leadership only)'
        )
        .setRequired(false)
    ),
  aliases: ['roles'],
  category: 'Server Moderation',
  showInHelp: true,
  easteregg: false,
  usage: 'add|remove <name of role>',
  args: false,
  isSlashCommand: true,
  execute: async (bot, message, args) => {
    const cmd = args.shift();

    if (!args.length) {
      const Roles = message.guild.roles.cache.map((r) => r.name);
      const addableRoles = Roles.filter((a) => !barredRoles.includes(a));

      const rolesEmbed = new Discord.MessageEmbed()
        .setColor('#004426')
        .setTitle('Server roles')
        .setDescription(
          'Add roles by typing `!role add <name of role>`\nRemove roles by typing `!role remove <name of role>`'
        )
        .addField('Roles you can add yourself to', addableRoles.join('\n'))
        .addField('Manually added by Leadership', leadershipRoles.join('\n'))
        .addField(
          'Leadership can assign the Leadership role to other members with the following command',
          '!role assign @member <name of role>'
        );

      return { embeds: [rolesEmbed] };
    }

    if (args.length >= 1) {
      if (
        cmd != 'add' &&
        cmd != 'remove' &&
        cmd != 'assign' &&
        cmd != 'unassign'
      )
        return message.channel.send('Invalid syntax. Use `add` or `remove`.');

      if (cmd === 'assign') {
        if (!(await leadershipCheck(message)))
          return 'You are not allowed to do that.';

        try {
          const memberAssign = message.mentions.members.first(); // gets the member object tagged in the message to be assigned a role
          const roleAssign = message.guild.roles.cache.find(
            (r) => r.name.toLowerCase() === args.slice(1).join(' ')
          ); // gets the role to be assigned to the member
          const name = !memberAssign.nickname
            ? memberAssign.user.username
            : memberAssign.nickname;

          if (!roleAssign) return 'That role does not exist.';
          if (memberAssign.roles.cache.has(roleAssign.id))
            return `${name} is already part of ${roleAssign.name}.`;

          memberAssign.roles.add(roleAssign);
          return `${name} is now part of ${roleAssign.name}.`;
        } catch (error) {
          console.error(error);
        }
      }

      if (cmd === 'unassign') {
        if (!(await leadershipCheck(message)))
          return message.channel.send('You are not allowed to do that.');

        try {
          const memberAssign = message.mentions.members.first();
          const roleUnassign = message.guild.roles.cache.find(
            (r) => r.name.toLowerCase() === args.slice(1).join(' ')
          );
          const name = !memberAssign.nickname
            ? memberAssign.user.username
            : memberAssign.nickname;

          if (!roleUnassign) return 'That role does not exist.';
          if (!memberAssign.roles.cache.has(roleUnassign.id))
            return `${name} is not part of ${roleUnassign.name}.`;

          memberAssign.roles.remove(roleUnassign.id);
          return `${name} has been unassigned from ${roleUnassign.name}.`;
        } catch (error) {
          console.error(error);
        }
      }

      const role = message.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === args.join(' ')
      );
      if (!role) return 'That role does not exist.';

      if (cmd === 'add') {
        const member = message.member;
        if (leadershipRoles.some((r) => role.name === r))
          return `That's illegal!`;
        if (member.roles.cache.has(role.id))
          return `You're already part of ${role.name}.`;
        member.roles.add(role);
        return `You've been added to ${role.name}.`;
      }
      if (cmd === 'remove') {
        const member = message.member;
        if (leadershipRoles.some((r) => role.name === r))
          return 'You can only be manually removed from that role by a leadership member.';
        if (!member.roles.cache.has(role.id))
          return `You are not part of ${role.name}.`;
        member.roles.remove(role);
        return `You've been removed from ${role.name}.`;
      }
    }
  },
  interact: async (interaction) => {
    const command = interaction.options.getString('command');
    const member = interaction.member;
    const role = interaction.options.getRole('role');
    const target = interaction.options.getMember('target');
    let isLeader = false;
    const leadershipRole = interaction.guild.roles.cache.find(
      (r) => r.name === 'Leadership'
    );
    if (interaction.member.roles.cache.has(leadershipRole.id)) isLeader = true;

    try {
      if (command === 'add') {
        const reply = await addRole(member, role);
        interaction.reply(reply);
      }
      if (command === 'remove') {
        const reply = await removeRole(member, role);
        interaction.reply(reply);
      }
      if (isLeader && command === 'assign') {
        if (target === null)
          return interaction.reply({
            content: 'Please include a target user.',
            ephemeral: true,
          });
        const reply = await assignRole(target, role);
        interaction.reply(reply);
      }
      if (isLeader && command === 'unassign') {
        if (target === null)
          return interaction.reply({
            content: 'Please include a target user.',
            ephemeral: true,
          });
        const reply = await unassignRole(target, role);
        interaction.reply(reply);
      }
    } catch (error) {
      console.error(error);
      // interaction.reply({ content: 'There was an error executing that command.', ephemeral: true })
      interaction.reply({
        content: `Error executing command:\n${codeBlock('js', error)}`,
        ephemeral: true,
      });
    }
  },
};

async function leadershipCheck() {
  const leadershipRole = message.guild.roles.cache.find(
    (r) => r.name === 'Leadership'
  );
  if (!message.member.roles.cache.has(leadershipRole.id)) return false;
  return true;
}

async function addRole(member, role) {
  if (barredRoles.some((r) => role.name === r))
    return { content: `That's illegal!`, ephemeral: true };
  if (member.roles.cache.has(role.id))
    return {
      content: `You're already part of ${role.name}.`,
      ephemeral: true,
    };
  await member.roles.add(role);
  return { content: `You've been added to ${role.name}.`, ephemeral: true };
}

async function removeRole(member, role) {
  if (barredRoles.some((r) => role.name === r))
    return {
      content:
        'You can only be manually removed from that role by a leadership member.',
      ephemeral: true,
    };
  if (!member.roles.cache.has(role.id))
    return {
      content: `You are not part of ${role.name}.`,
      ephemeral: true,
    };
  await member.roles.remove(role);
  return {
    content: `You've been removed from ${role.name}.`,
    ephemeral: true,
  };
}

async function assignRole(target, role) {
  const targetName = target.nickname ? target.nickname : target.user.username;
  if (!leadershipRoles.some((r) => role.name === r))
    return {
      content: 'Please pass in a leadership role.',
      ephemeral: true,
    };
  if (target.roles.cache.has(role.id))
    return {
      content: `${targetName} is already assigned the ${role.name} role.`,
    };
  await target.roles.add(role);
  return {
    content: `<@!${target.id}>, you have been assigned the ${role.name} role.`,
  };
}

async function unassignRole(target, role) {
  const targetName = target.nickname ? target.nickname : target.user.username;
  if (!leadershipRoles.some((r) => role.name === r))
    return {
      content: 'Please pass in a leadership role.',
      ephemeral: true,
    };
  if (!target.roles.cache.has(role.id))
    return {
      content: `${targetName} is not assigned the ${role.name} role.`,
    };
  await target.roles.remove(role);
  return {
    content: `<@!${target.id}>, you have been unassigned from the ${role.name} role.`,
  };
}
