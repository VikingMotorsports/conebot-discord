const fs = require('fs');
const Discord = require('discord.js');
const bonks = ['https://tenor.com/view/kendo-shinai-bonk-doge-horny-gif-20995284', 'https://tenor.com/view/guillotine-bonk-revolution-gif-20305805', 'https://tenor.com/view/bonk-gif-21125069', 'https://tenor.com/view/bonk-boink-scout-baseball-bat-gif-18381898', 'https://tenor.com/view/bonk-gif-18805247', 'https://cdn.discordapp.com/attachments/646510074986233867/848454757529288704/artworks-mE1IUzaGR3Ynjko5-CFEYxw-t500x500.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454839008886784/FB_IMG_1618329849229.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454906389069894/FB_IMG_1618329857597.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454944910868480/FB_IMG_1618329853530.png', 'https://cdn.discordapp.com/attachments/646510074986233867/848454985699950612/FB_IMG_1618329661644.png'];

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
            // console.log(userIDs);
            // const users = message.mentions.members.map(u => u.id);
            // console.log(users);
            for ([i, id] of userIDs.entries()) { //! figure out how to write multiple bonks to same file
                // console.log(i, id);
                const objIndex = json.findIndex(o => o.id === id);
                // console.log(objIndex);
                let bonkMember;
                if (objIndex === -1) {
                    bonkMember = {
                        "id": id,
                        "name": userNames[i],
                        "bonk": 1
                    }

                    json.push(bonkMember);
                    // fs.writeFile('./bonk.json', JSON.stringify(json, null, '\t'), err => {
                    //     if (err) return console.error(err);
                    // });
                    await fs.promises.writeFile('./bonk.json', JSON.stringify(json, null, '\t'), 'utf8')
                } else {
                    let bonks = json[i].bonk + 1;
                    console.log(bonks);
                    bonkMember = {
                        "id": id,
                        "name": userNames[i],
                        "bonk": bonks
                    }

                    const update = [
                        ...json.slice(0, objIndex),
                        bonkMember,
                        ...json.slice(objIndex + 1),
                    ];
                    // fs.writeFile('./bonk.json', JSON.stringify(update, null, '\t'), err => {
                    //     if (err) return console.error(err);
                    // })
                    await fs.promises.writeFile('./bonk.json', JSON.stringify(update, null, '\t'), 'utf8')
                }
            }

            message.channel.send(bonks[Math.floor(Math.random() * bonks.length)]);
        }
    }
}

async function writeBonk(i, id)