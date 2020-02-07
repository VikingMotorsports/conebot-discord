const Discord = require('discord.js');

module.exports = {
    name: 'tutorials',
    description: 'List of links to tutorials',
    easteregg: false,
    execute: async (bot, message, args) => {
        const tutorialEmbed = new Discord.RichEmbed()
            .setColor('#004426')
            .setTitle('Tutorials')
            .addField('SolidWorks', 'https://www.solidworks.com/sw/resources/solidworks-tutorials.htm')
            .addField('LaTeX', 'https://www.latex-tutorial.com/')
            .addField('Coding', 'https://www.w3schools.com/')
            .setFooter('If you want more tutorials added in, contact Geary or another server developer.');

        message.channel.send(tutorialEmbed);
    }
}