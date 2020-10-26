const {inventoryDocumentation, inventoryList, inventoryForm} = require('../links.json');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'inventory',
    description: 'Show inventory list, check in/out, and documentation',
    category: 'Team',
    args: false,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        const embed = new MessageEmbed().setTitle('VMS Inventory').setColor('#004426')
            .setDescription('Please read the documentation before using the check in/out form.')
            .addField('Documentation', inventoryDocumentation)
            .addField('List', inventoryList)
            .addField('Check in/out', inventoryForm);

        message.channel.send(embed);
    }
}