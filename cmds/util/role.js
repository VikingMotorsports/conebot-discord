/**
 * @file Add or remove your roles on the server.
 *
 * Prefix command:
 * <prefix>role list                                 List allowed roles.
 * <prefix>role {add|remove} <role name>             Add or remove role.
 * <prefix>role {assign|unassign} @user <role name>  Leadership assign role.
 *
 * slash command:
 * /role list                                        List allowed roles.
 * /role add role:name                               Add role.
 * /role remove role:name                            Remove role.
 * /role assign role:name target:user                Leadership add role.
 * /role unassign role:name target:user              Leadership remove role.
 */

const {
    EmbedBuilder,
    SlashCommandBuilder,
    MessageFlags,
    codeBlock,
} = require('discord.js');
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
        .addSubcommand((subcommand) =>
            subcommand
                .setName('list')
                .setDescription('List all available roles')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('Add a role to yourself')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('The role to add')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role from yourself')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('The role to remove')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('assign')
                .setDescription('[Leadership] Add a role to a member')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('The role to assign')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('target')
                        .setDescription('Target member')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('unassign')
                .setDescription('[Leadership] Remove a role from a member')
                .addRoleOption((option) =>
                    option
                        .setName('role')
                        .setDescription('The role to unassign')
                        .setRequired(true)
                )
                .addUserOption((option) =>
                    option
                        .setName('target')
                        .setDescription('Target member')
                        .setRequired(true)
                )
        ),
    aliases: ['roles'],
    category: 'Server Moderation',
    showInHelp: true,
    easteregg: false,
    usage: 'add|remove <name of role>',
    args: false,
    isSlashCommand: true,
    execute: async (_bot, message, args) => {
        const action = args.shift();

        try {
            switch (action) {
                case 'list':
                    return allowedRolesEmbed(message.guild);
                case 'assign': {
                    if (!leadershipCheck(message)) {
                        return 'You are not allowed to do that.';
                    }

                    const memberAssign = message.mentions.members.first();
                    const roleAssign = message.guild.roles.cache.find(
                        (r) => r.name.toLowerCase() === args.slice(1).join(' ')
                    );
                    const name =
                        memberAssign.nickname ?? memberAssign.user.username;

                    if (!roleAssign) {
                        return 'That role does not exist.';
                    }
                    if (memberAssign.roles.cache.has(roleAssign.id)) {
                        return `${name} is already part of ${roleAssign.name}.`;
                    }

                    memberAssign.roles.add(roleAssign);
                    return `${name} is now part of ${roleAssign.name}.`;
                }
                case 'unassign': {
                    if (!leadershipCheck(message)) {
                        return 'You are not allowed to do that.';
                    }

                    const memberAssign = message.mentions.members.first();
                    const roleUnassign = message.guild.roles.cache.find(
                        (r) => r.name.toLowerCase() === args.slice(1).join(' ')
                    );
                    const name =
                        memberAssign.nickname ?? memberAssign.user.username;

                    if (!roleUnassign) {
                        return 'That role does not exist.';
                    }
                    if (!memberAssign.roles.cache.has(roleUnassign.id)) {
                        return `${name} is not part of ${roleUnassign.name}.`;
                    }

                    memberAssign.roles.remove(roleUnassign.id);
                    return `${name} has been unassigned from ${roleUnassign.name}.`;
                }
                case 'add': {
                    const member = message.member;
                    const role = message.guild.roles.cache.find(
                        (r) => r.name.toLowerCase() === args.join(' ')
                    );

                    if (!role) {
                        return 'That role does not exist.';
                    }
                    if (leadershipRoles.some((r) => role.name === r)) {
                        return 'You can only be added that role by leadership.';
                    }
                    if (member.roles.cache.has(role.id)) {
                        return `You're already part of ${role.name}.`;
                    }

                    member.roles.add(role);
                    return `You've been added to ${role.name}.`;
                }
                case 'remove': {
                    const member = message.member;
                    const role = message.guild.roles.cache.find(
                        (r) => r.name.toLowerCase() === args.join(' ')
                    );

                    if (!role) {
                        return 'That role does not exist.';
                    }
                    if (leadershipRoles.some((r) => role.name === r)) {
                        return 'You can only be removed from that role by leadership.';
                    }
                    if (!member.roles.cache.has(role.id)) {
                        return `You are not part of ${role.name}.`;
                    }

                    member.roles.remove(role);
                    return `You've been removed from ${role.name}.`;
                }
                default: {
                    return 'Invalid action: specify `list`, `add`, or `remove`.';
                }
            }
        } catch (error) {
            console.error(error);
            return {
                content: `Error executing command:\n${codeBlock('js', error)}`,
                flags: MessageFlags.Ephemeral,
            };
        }
    },
    interact: async (interaction) => {
        const member = interaction.member;
        const role = interaction.options.getRole('role');
        const target = interaction.options.getMember('target');
        const leadershipRole = interaction.guild.roles.cache.find(
            (r) => r.name === 'Leadership'
        );
        const isLeader = interaction.member.roles.cache.has(leadershipRole.id);

        try {
            switch (interaction.options.getSubcommand()) {
                case 'list':
                    await interaction.reply(
                        allowedRolesEmbed(interaction.guild)
                    );
                    return;
                case 'add': {
                    const reply = await addRole(member, role);
                    await interaction.reply(reply);
                    return;
                }
                case 'remove': {
                    const reply = await removeRole(member, role);
                    await interaction.reply(reply);
                    return;
                }
                case 'assign': {
                    if (!isLeader) {
                        await interaction.reply(
                            'Only leadership can assign roles.'
                        );
                        return;
                    }
                    if (target === null) {
                        await interaction.reply({
                            content: 'Please include a target user.',
                            flags: MessageFlags.Ephemeral,
                        });
                        return;
                    }
                    const reply = await assignRole(target, role);
                    await interaction.reply(reply);
                    return;
                }
                case 'unassign': {
                    if (!isLeader) {
                        await interaction.reply(
                            'Only leadership can unassign roles.'
                        );
                        return;
                    }
                    if (target === null) {
                        await interaction.reply({
                            content: 'Please include a target user.',
                            flags: MessageFlags.Ephemeral,
                        });
                        return;
                    }
                    const reply = await unassignRole(target, role);
                    await interaction.reply(reply);
                    return;
                }
                default: {
                    await interaction.reply(
                        'Invalid action: specify `list`, `add`, or `remove`.'
                    );
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `Error executing command:\n${codeBlock('js', error)}`,
                flags: MessageFlags.Ephemeral,
            });
        }
    },
    help: () => {
        return `
        Add or remove your roles on the server.

        **Prefix command:**
        \`<prefix>role list\` -                                 List allowed roles.
        \`<prefix>role {add|remove} <role name>\` -             Add or remove role.
        \`<prefix>role {assign|unassign} @user <role name>\` -  Leadership assign role.

        **slash command:**
        \`/role list\` -                           List allowed roles.
        \`/role add role:name\` -                  Add role.
        \`/role remove role:name\` -               Remove role.
        \`/role assign role:name target:user\` -   Leadership add role.
        \`/role unassign role:name target:user\` - Leadership remove role.`;
    },
};

function allowedRolesEmbed(guild) {
    const Roles = guild.roles.cache.map((r) => r.name);
    const addableRoles = Roles.filter((a) => !barredRoles.includes(a));

    const rolesEmbed = new EmbedBuilder()
        .setColor('#004426')
        .setTitle('Server roles')
        .setDescription(
            `Add roles by typing \`!role add <name of role>\`
            Remove roles by typing \`!role remove <name of role>\``
        )
        .addFields(
            {
                name: 'Roles you can add yourself to',
                value: addableRoles.join('\n'),
            },
            {
                name: 'Manually added by Leadership',
                value: leadershipRoles.join('\n'),
            },
            {
                name:
                    'Leadership can assign the Leadership role to ' +
                    'other members with the following command',
                value: '!role assign @member <name of role>',
            }
        );

    return { embeds: [rolesEmbed] };
}

function leadershipCheck(message) {
    const leadershipRole = message.guild.roles.cache.find(
        (r) => r.name === 'Leadership'
    );
    if (!message.member.roles.cache.has(leadershipRole.id)) return false;
    return true;
}

async function addRole(member, role) {
    if (barredRoles.some((r) => role.name === r))
        return { content: "That's illegal!", flags: MessageFlags.Ephemeral };
    if (member.roles.cache.has(role.id))
        return {
            content: `You're already part of ${role.name}.`,
            flags: MessageFlags.Ephemeral,
        };
    await member.roles.add(role);
    return {
        content: `You've been added to ${role.name}.`,
        flags: MessageFlags.Ephemeral,
    };
}

async function removeRole(member, role) {
    if (barredRoles.some((r) => role.name === r))
        return { content: "That's illegal!", flags: MessageFlags.Ephemeral };
    if (!member.roles.cache.has(role.id))
        return {
            content: `You are not part of ${role.name}.`,
            flags: MessageFlags.Ephemeral,
        };
    await member.roles.remove(role);
    return {
        content: `You've been removed from ${role.name}.`,
        flags: MessageFlags.Ephemeral,
    };
}

async function assignRole(target, role) {
    const targetName = target.nickname ?? target.user.username;
    if (target.roles.cache.has(role.id))
        return {
            content: `${targetName} is already assigned the ${role.name} role.`,
            flags: MessageFlags.Ephemeral,
        };
    await target.roles.add(role);
    return {
        content: `<@!${target.id}>, you have been assigned the ${role.name} role.`,
    };
}

async function unassignRole(target, role) {
    const targetName = target.nickname ?? target.user.username;
    if (!target.roles.cache.has(role.id))
        return {
            content: `${targetName} is not assigned the ${role.name} role.`,
            flags: MessageFlags.Ephemeral,
        };
    await target.roles.remove(role);
    return {
        content: `<@!${target.id}>, you have been unassigned from the ${role.name} role.`,
    };
}
