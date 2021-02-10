const { license } = require('../links.json');

module.exports = {
    name: 'license',
    aliases: ['licenseRequest', 'licenserequest', 'request', 'solidworks'],
    description: 'Form to submit a request for a SolidWorks License Key',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(license);
    }
}