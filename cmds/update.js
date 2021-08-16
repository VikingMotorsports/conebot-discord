const fs = require('fs').promises;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update bot parameters'),
    category: 'Server Moderation',
    usage: '<parameter> <new value>',
    args: true,
    showInHelp: true,
    easteregg: false,
    execute: async (bot, message, args) => {
        const leadershipRole = message.guild.roles.cache.find(r => r.name === 'Leadership');
        const updatableParameters = ['competition', 'prefix'];
        if (!message.member.roles.cache.has(leadershipRole.id)) return message.channel.send('Not allowed.');

        try {
            if (!updatableParameters.includes(args[0])) return console.log('That parameter is not updatable.');

            const data = await fs.readFile('./config.json');
            let config = JSON.parse(data);
            const newValue = args.slice(1);

            config[args[0]] = newValue.join(' ');

            fs.writeFile('./config.json', JSON.stringify(config, null, '\t'));
        } catch (error) {
            console.error(error);
        }
    }
}