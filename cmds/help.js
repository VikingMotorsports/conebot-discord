const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'List of commands the bot can perform',
    execute(message, args) {
        const helpEmbed = new Discord.RichEmbed()
            .setColor('#004225')
            .setTitle('Available commands')
            .addField('!drive', 'Google Drive folder')
            .addField('!stash', 'VMS stash directory')
            .addField('!handbook', 'Member Handbook')
            .addField('!rules', 'Link to FSAE rule book')
            .addField('!reference', 'Reference documents folder')
            .addField('!timeline', 'View the current timeline of projects')
            .addField('!currentcar', 'Google Drive folder of the current car')
            .addField('!minutes', 'General meeting minutes')
            .addField('!order', 'Ordering form')
            .addField('!affiliate', 'Tutorial on how to affiliate yourself with the team on sae.org')
            .addField('!tutorials', 'List of links to tutorials')
            .addField('!role', 'Commands for role management')
            .addField('!roll XdY', 'Roll X standard (4, 6, 8, 10, 12, 20) Y-sided dice');

        message.channel.send(helpEmbed);
    }
}