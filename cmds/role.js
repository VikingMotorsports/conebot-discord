module.exports = {
    name: 'role',
    aliases: ['roles'],
    description: 'Commands for adding or removing roles',
    args: true,
    execute(message, args) {
        // const roleNames = message.guild.roles.map(r => r.name).join('\n');
        // console.log(roleNames);
        if (args[1]) {
            if (args[2]) {

            }
            if (args[0] != 'add' && args[0] != 'remove') {
                message.channel.send('Invalid syntax. Use `add` or `remove`');
            } else if (args[0] === 'add') {
                let member = message.member;
                let roleQuery = args[1];
                // console.log(roleQuery);
                let role = message.guild.roles.find(r => r.name.toLowerCase() === `${roleQuery}`);
                // console.log(role);
                if (!role) {
                    message.channel.send('That role does not exist.');
                } else {
                    if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot') {
                        message.channel.send('That\'s illegal!');
                    } else {
                        if (member.roles.has(role.id)) {
                            message.channel.send(`You\'re already part of ${role.name}.`);
                        } else {
                            member.addRole(role);
                            message.channel.send(`You\'ve been added to ${role.name}.`);
                        }

                    }
                }
            } else if (args[0] === 'remove') {
                let member = message.member;
                let roleQuery = args[1];
                let role = message.guild.roles.find(r => r.name.toLowerCase() === `${roleQuery}`);
                if (!role) {
                    message.channel.send('That role does not exist.');
                } else {
                    if (role.name === 'Admin' || role.name === 'Leadership' || role.name === 'Subsystem Lead' || role.name === 'Bot' || role.name === 'Cone Bot') {
                        message.channel.send('You can only be manually removed from that role by another member.');
                    } else {
                        if (!member.roles.has(role.id)) {
                            message.channel.send(`You are not part of ${role.name}.`);
                        } else {
                            member.removeRole(role);
                            message.channel.send(`You\'ve been removed from ${role.name}.`);
                        }

                    }
                }
            }
        } else {
            if (args[0] != 'add' && args[0] != 'remove') {
                message.channel.send('Invalid syntax. Use `add` or `remove`')
            } else {
                message.channel.send('Please input a role.');
                console.log('no role');
            }
        }
    }
}