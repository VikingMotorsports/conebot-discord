const { license } = require('../links.json');

module.exports = {
    data: {
        name: 'license',
        description: 'Form to submit a request for a SolidWorks License Key'
    },
    aliases: ['licenseRequest', 'licenserequest', 'request', 'solidworks'],
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send(license);
    }
}