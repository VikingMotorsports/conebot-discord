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
            const helpEmbed = new Discord.RichEmbed()
                .setColor('#004225')
                .setTitle('Available commands')
                .setDescription(`Type ${prefix}help [command name] to get info on a specific command.`)
                .addField('!drive', 'Google Drive folder')
                .addField('!stash', 'VMS stash directory')
                .addField('!handbook', 'Member Handbook')
                .addField('!rules', 'Link to FSAE rule book')
                .addField('!reference', 'Reference documents folder')
                .addField('!timeline', 'View the current timeline of projects')
                .addField('!currentcar', 'Google Drive folder of the current car')
                .addField('!minutes', 'General meeting minutes')
                // .addField('!order', 'Ordering form')
                .addField('!affiliate', 'Tutorial on how to affiliate yourself with the team on sae.org')
                .addField('!tutorials', 'List of links to tutorials')
                .addField('!role <add|remove> <role>', 'Commands for role management')
                .addField('!roll XdY', 'Roll X Y-sided dice');

            message.channel.send(helpEmbed);
        } else if (args.length == 1) {
            const name = args[0];
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.channel.send('Command does not exist.');
            }

            const commandHelp = new Discord.RichEmbed()
                .setAuthor(`Command: ${command.name}`)
                .setColor('#004225');

            if (command.aliases) commandHelp.addField('Aliases', command.aliases.join(', '));
            if (command.description) commandHelp.setDescription(command.description);
            if (command.usage) {
                commandHelp.setTitle(`Usage: ${prefix}${command.name} ${command.usage}`);
            } else if (!command.usage) {
                commandHelp.setTitle(`Usage: ${prefix}${command.name}`);
            }

            message.channel.send(commandHelp);
        }
    }
}