const {
    prefix
} = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'List of commands the bot can perform or info about a specific command.',
    usage: '[command name]',
    execute(message, args) {
        const {
            commands
        } = message.client;
        if (!args.length) {
            let cmd = [];
            let cmdDesc = [];
            const commandsArray = commands.map(c => {
                if (!c.easteregg && c.easteregg != undefined) {
                    cmd.push(`${prefix}${c.name}`);
                    cmdDesc.push(c.description);
                }
            });
            // commandsArray.forEach(command => {
            //     if (command != undefined) cmd.push(`${prefix}${command}`);
            // });

            const allCmds = new Discord.RichEmbed()
                .setTitle('All available commands')
                .setDescription(`Type ${prefix}help [command name] to get info on a specific command.\n`)
                .setColor('#004426');

            for (let i = 0; i < cmd.length; i++) {
                allCmds.addField(cmd[i], cmdDesc[i]);
            }
            // console.log(allCmds);
            message.channel.send(allCmds);
        } else if (args.length == 1) {
            let name = args[0];
            if (name.startsWith(prefix)) name = name.slice(prefix.length);
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.channel.send('Command does not exist.');
            }

            const commandHelp = new Discord.RichEmbed()
                // .setAuthor(`Command: ${command.name}`)
                .setColor('#004225');

            if (command.aliases) commandHelp.addField('Aliases', command.aliases.join(', '));
            if (command.description) commandHelp.setDescription(command.description);
            if (command.usage) {
                commandHelp.setTitle(`${prefix}${command.name} ${command.usage}`);
            } else if (!command.usage) {
                commandHelp.setTitle(`${prefix}${command.name}`);
            }

            message.channel.send(commandHelp);
        }
    }
}