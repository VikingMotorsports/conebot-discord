const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'bonk',
    description: 'Bonk someone',
    category: 'Miscellaneous',
    usage: '@user or count <@user>',
    args: true,
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        const data = await fs.promises.readFile('./bonk.json')
        const json = JSON.parse(data);

        if (args[0] === 'leaderboard') {
            if (!json.length) return message.channel.send('No bonks yet. Surprising.');


        }
        if (message.mentions.users.size > 0) {
            const userIDs = [];
            const userNames = [];
            message.mentions.members.map(u => {
                const name = !u.nickname ? u.user.username : u.nickname;
                const id = u.id;
                userIDs.push(id);
                userNames.push(name);
            });

            for (i of userIDs) {
                json.findIndex(obj => obj.id === i)
            }
        }
    }
}