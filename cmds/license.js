const { license } = require('../links.json');

module.exports = {
    name: 'license',
    aliases: ['licenseRequest', 'licenserequest', 'request'],
    description: 'Form to submit a request for a SolidWorks License Key',
    category: 'team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(license);
    }
}