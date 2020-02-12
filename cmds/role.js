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

        if (!args.length) {
            const Roles = message.guild.roles.map(r => r.name);
            const miscRoles = ['Cone Bot', 'Member', 'Bot', 'Overlord', '@everyone'];
            const leadershipRoles = ['Admin', 'Department', 'Leadership', 'Subsystem Lead'];
            const addableRoles = Roles.filter(a => !miscRoles.includes(a) && !leadershipRoles.includes(a));

            const rolesEmbed = new Discord.RichEmbed()
                .setColor('#004426')
                .setTitle('Server roles')
                .setDescription('Add roles by typing `!role add <name of role>`')
                .addField('Roles you can add yourself to', addableRoles.join('\n'))
                .addField('Manually added by Leadership', leadershipRoles.join('\n'));

            message.channel.send(rolesEmbed);
        }

        if (args.length >= 1) {
            const roleQuery = args.join(' ');

            if (cmd != 'add' && cmd != 'remove') return message.channel.send('Invalid syntax. Use `add` or `remove`.');
            if (cmd === 'add') {
                let member = message.member;
                let role = message.guild.roles.find(r => r.name.toLowerCase() === roleQuery);
                if (!role) return message.channel.send('That role does not exist.');
                // if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot') return message.channel.send(`That's illegal!`);
                if (leadershipRoles.some(r => role.name === r)) return message.channel.send(`That's illegal!`);
                if (member.roles.has(role.id)) return message.channel.send(`You're already part of ${role.name}.`);
                member.addRole(role);
                message.channel.send(`You've been added to ${role.name}.`);
            }
            if (cmd === 'remove') {
                let member = message.member;
                let role = message.guild.roles.find(r => r.name.toLowerCase() === roleQuery);
                if (!role) return message.channel.send('That role does not exist.');
                // if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot' || role.name === 'Member') return message.channel.send('You can only be manually removed from that role by a leadership member.');
                if (leadershipRoles.some(r => role.name === r)) return message.channel.send('You can only be manually removed from that role by a leadership member.');
                if (!member.roles.has(role.id)) return message.channel.send(`You are not part of ${role.name}.`);
                member.addRole(role);
                message.channel.send(`You've been removed from ${role.name}.`);
            }
        }
    }
}