const fs = require('fs');
const Discord = require('discord.js');
const bonks = ['https://media.tenor.co/videos/8c041ab902e52fddfda687d6e7e5ef64/mp4', 'https://tenor.com/view/guillotine-bonk-revolution-gif-20305805', 'https://tenor.com/view/bonk-gif-21125069', 'https://tenor.com/view/bonk-boink-scout-baseball-bat-gif-18381898', 'https://tenor.com/view/bonk-gif-18805247', 'https://cdn.discordapp.com/attachments/646510074986233867/848454757529288704/artworks-mE1IUzaGR3Ynjko5-CFEYxw-t500x500.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454839008886784/FB_IMG_1618329849229.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454906389069894/FB_IMG_1618329857597.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454944910868480/FB_IMG_1618329853530.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454985699950612/FB_IMG_1618329661644.png'];

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
            let reply = '';

            for (i of userIDs) {
                if (!(i in json)) {
                    json[i] = 1;
                } else {
                    json[i] += 1;
                }
                reply += `<@${i}> `;

                fs.writeFile('./bonk.json', JSON.stringify(json, null, '\t'), err => {
                    if (err) return console.error(err);
                });
            }

            message.channel.send(reply, {
                embed: {
                    image: {
                        url: bonks[Math.floor(Math.random() * bonks.length)]
                    }
                }
            });
        }
    }
}