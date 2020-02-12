const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'List of commands the bot can perform or info about a specific command.',
    usage: '<command name>',
    execute: async (bot, message, args) => {
        if (!args.length) {
            let categorizedCmds = {};

            bot.commands.map(c => {
                if (c.showInHelp) {
                    if (!categorizedCmds[c.category]) {
                        categorizedCmds[c.category] = [];
                    }
                    categorizedCmds[c.category].push(`${prefix}${c.name}`);
                }
            });

            const allCmds = new Discord.RichEmbed()
                .setTitle('All available commands')
                .setDescription(`Type ${prefix}help <command name> to get info on a specific command.\n`)
                .setColor('#004426');

            for (const [cat, cmd] of Object.entries(categorizedCmds)) {
                allCmds.addField(cat, cmd.join('\n'));
            }

            message.channel.send(allCmds);
        } else if (args.length == 1) {
            let name = args[0];
            if (name.startsWith(prefix)) name = name.slice(prefix.length);
            const command = bot.commands.get(name) || bot.commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.channel.send('Command does not exist.');
            }

            const commandHelp = new Discord.RichEmbed()
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