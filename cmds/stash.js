const Discord = require('discord.js');

module.exports = {
    name: 'stash',
    description: 'VMS stash directory',
    easteregg: false,
    execute(message, args) {
        const stashEmbed = new Discord.RichEmbed()
            .setColor('#1B998B')
            .setTitle('Connecting to VMS Stash')
            .addField('on Windows', 'https://cat.pdx.edu/platforms/windows/remote-access/windows-to-stash/')
            .addField('on Mac', 'https://cat.pdx.edu/platforms/mac/remote-access/stash/')
            .addField('on Linux', 'https://cat.pdx.edu/platforms/linux/remote-access/connect-stash/')
            .addField('Stash name', 'vms');

        message.channel.send(stashEmbed);
    }
}