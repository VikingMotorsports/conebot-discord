const Discord = require('discord.js');

module.exports = {
    name: 'role',
    aliases: ['roles'],
    description: 'Commands for adding or removing roles',
    category: 'Server Moderation',
    showInHelp: true,
    easteregg: false,
    usage: 'add|remove <name of role>',
    args: false,
    execute: async (bot, message, args) => {
        const cmd = args.shift();
        const miscRoles = ['Cone Bot', 'Member', 'Bot', 'Overlord', '@everyone', 'Admin', 'Server Booster', 'Rythm'];
        const leadershipRoles = ['Department', 'Leadership', 'Subsystem Lead', 'Shop Manager', 'IT Manager', 'Server Developer'];

        if (!args.length) {
            const Roles = message.guild.roles.cache.map(r => r.name);
            const addableRoles = Roles.filter(a => !miscRoles.includes(a) && !leadershipRoles.includes(a));

            const rolesEmbed = new Discord.MessageEmbed()
                .setColor('#004426')
                .setTitle('Server roles')
                .setDescription('Add roles by typing `!role add <name of role>`\nRemove roles by typing `!role remove <name of role>`')
                .addField('Roles you can add yourself to', addableRoles.join('\n'))
                .addField('Manually added by Leadership', leadershipRoles.join('\n'))
                .addField('Leadership can assign the Leadership role to other members with the following command', '!role assign @member <name of role>');

            message.channel.send(rolesEmbed);
        }

        if (args.length >= 1) {
            if (cmd != 'add' && cmd != 'remove' && cmd != 'assign' && cmd != 'unassign') return message.channel.send('Invalid syntax. Use `add` or `remove`.');

            if (cmd === 'assign') {
                if (!await leadershipCheck(message)) return message.channel.send('You are not allowed to do that.');

                try {
                    const memberAssign = message.mentions.members.first(); // gets the member object tagged in the message to be assigned a role
                    const roleAssign = message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ')); // gets the role to be assigned to the member
                    const name = (!memberAssign.nickname) ? memberAssign.user.username : memberAssign.nickname;

                    if (!roleAssign) return message.channel.send('That role does not exist.');
                    if (memberAssign.roles.cache.has(roleAssign.id)) return message.channel.send(`${name} is already part of ${roleAssign.name}.`);

                    memberAssign.roles.add(roleAssign);
                    return message.channel.send(`${name} is now part of ${roleAssign.name}.`);
                } catch (error) {
                    console.error(error);
                }
            }

            if (cmd === 'unassign') {
                if (!await leadershipCheck(message)) return message.channel.send('You are not allowed to do that.');

                try {
                    const memberAssign = message.mentions.members.first();
                    const roleUnassign = message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' '));
                    const name = (!memberAssign.nickname) ? memberAssign.user.username : memberAssign.nickname;

                    if (!roleUnassign) return message.channel.send('That role does not exist.');
                    if (!memberAssign.roles.cache.has(roleUnassign.id)) return message.channel.send(`${name} is not part of ${roleUnassign.name}.`);

                    memberAssign.roles.remove(roleUnassign.id);
                    return message.channel.send(`${name} has been unassigned from ${roleUnassign.name}.`);
                } catch (error) {
                    console.error(error);
                }
            }

            const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' '));
            if (!role) return message.channel.send('That role does not exist.');

            if (cmd === 'add') {
                const member = message.member;
                if (leadershipRoles.some(r => role.name === r)) return message.channel.send(`That's illegal!`);
                if (member.roles.cache.has(role.id)) return message.channel.send(`You're already part of ${role.name}.`);
                member.roles.add(role);
                message.channel.send(`You've been added to ${role.name}.`);
            }
            if (cmd === 'remove') {
                const member = message.member;
                if (leadershipRoles.some(r => role.name === r)) return message.channel.send('You can only be manually removed from that role by a leadership member.');
                if (!member.roles.cache.has(role.id)) return message.channel.send(`You are not part of ${role.name}.`);
                member.roles.remove(role);
                message.channel.send(`You've been removed from ${role.name}.`);
            }
        }
    }
}

async function leadershipCheck(message) {
    const leadershipRole = message.guild.roles.cache.find(r => r.name === 'Leadership');
    if (!message.member.roles.cache.has(leadershipRole.id)) return false;
    return true;
}