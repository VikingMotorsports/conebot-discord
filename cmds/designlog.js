module.exports = {
    name: 'designlog',
    aliases: ['log'],
    description: 'Working document for design logs of the car',
    category: 'Team',
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://docs.google.com/document/d/1PTVt5IlhiB_tLvzpm82g08CiWcEa-pg5gTPbIgsQQuI/edit?usp=sharing');
    }
}