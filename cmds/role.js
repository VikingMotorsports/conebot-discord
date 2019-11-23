module.exports = {
    name: 'role',
    aliases: ['roles'],
    description: 'Commands for adding or removing roles',
    easteregg: false,
    usage: '<add|remove> <role>',
    args: true,
    execute(message, args) {
        const cmd = args.shift();

        if (args.length > 1) {
            const roleQuery = args.join(' ');

            if (cmd != 'add' && cmd != 'remove') {
                message.channel.send('Invalid syntax. Use `add` or `remove`.')
            } else if (cmd === 'add') {
                let member = message.member;
                let role = message.guild.roles.find(r => r.name.toLowerCase() === roleQuery);
                if (!role) {
                    message.channel.send('That role does not exist.');
                } else if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot') {
                    message.channel.send('That\'s illegal!');
                } else {
                    if (member.roles.has(role.id)) {
                        message.channel.send(`You're already part of ${role.name}.`)
                    } else {
                        member.addRole(role);
                        message.channel.send(`You've been added to ${role.name}.`)
                    }
                }
            } else if (cmd === 'remove') {
                let member = message.member;
                let role = message.guild.roles.find(r => r.name.toLowerCase() === roleQuery);
                if (!role) {
                    message.channel.send('That role does not exist.');
                } else if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot' || role.name === 'Member') {
                    message.channel.send('You can only be manually removed from that role by another member.');
                } else {
                    if (!member.roles.has(role.id)) {
                        message.channel.send(`You are not part of ${role.name}.`);
                    } else {
                        member.removeRole(role);
                        message.channel.send(`You've been removed from ${role.name}.`);
                    }
                }
            }
        } else if (args.length == 1) {
            const roleQuery = args[0];

            if (cmd != 'add' && cmd != 'remove') {
                message.channel.send('Invalid syntax. Use `add` or `remove`.')
            } else if (cmd === 'add') {
                let member = message.member;
                let role = message.guild.roles.find(r => r.name.toLowerCase() === roleQuery);
                if (!role) {
                    message.channel.send('That role does not exist.');
                } else if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot') {
                    message.channel.send('That\'s illegal!');
                } else {
                    if (member.roles.has(role.id)) {
                        message.channel.send(`You're already part of ${role.name}.`)
                    } else {
                        member.addRole(role);
                        message.channel.send(`You've been added to ${role.name}.`)
                    }
                }
            } else if (cmd === 'remove') {
                let member = message.member;
                let role = message.guild.roles.find(r => r.name.toLowerCase() === roleQuery);
                if (!role) {
                    message.channel.send('That role does not exist.');
                } else if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot') {
                    message.channel.send('You can only be manually removed from that role by another member.');
                } else {
                    if (!member.roles.has(role.id)) {
                        message.channel.send(`You are not part of ${role.name}.`);
                    } else {
                        member.removeRole(role);
                        message.channel.send(`You've been removed from ${role.name}.`);
                    }
                }
            }
        } else if (!args.length) {
            message.channel.send('Please input a role.');
        }
    }
}