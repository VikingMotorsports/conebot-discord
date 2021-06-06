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
        let response = '';

        if (args[0] === 'leaderboard') {
            if (!json.length) return message.channel.send('No bonks yet. Surprising.');

            const sorted = json.slice(0).sort((a, b) => {
                return b.bonk - a.bonk;
            });

            let leaderboard = [];

            for (b of sorted) {
                leaderboard.push(`${b.name} - ${b.bonk}`);
            }

            const total = sorted.map(s => s.bonk).reduce((a, b) => a + b);

            const embed = new Discord.MessageEmbed().setTitle(`Bonk'd Hall of Shame`).setColor('#96031A')
                .setDescription(leaderboard.join('\n'))
                .setFooter(`Total bonks: ${total}`);

            message.channel.send(embed);
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
            for ([i, id] of userIDs.entries()) { 
                const bonkData = await fs.promises.readFile('./bonk.json');
                let bonkJson = JSON.parse(bonkData);
                const objIndex = bonkJson.findIndex(o => o.id === id);
                let bonkMember;
                if (objIndex === -1) {
                    bonkMember = {
                        "id": id,
                        "name": userNames[i],
                        "bonk": 1
                    }

                    bonkJson.push(bonkMember);
                    await fs.promises.writeFile('./bonk.json', JSON.stringify(bonkJson, null, '\t'), 'utf8')
                    response = bonks[Math.floor(Math.random() * bonks.length)];
                } else {
                    let newBonk = bonkJson[objIndex].bonk;
                    const roll = Math.floor(Math.random() * 10);
                    let unbonk = false;
                    if (roll === 0) unbonk = true;

                    switch(unbonk) {
                        case true:
                            console.log('unbonk');
                            bonkMember = {
                                "id": id,
                                "name": userNames[i],
                                "bonk": newBonk - 1
                            }
                            response = 'https://cdn.discordapp.com/attachments/646510074986233867/849383431073955850/FB_IMG_1615148902348.jpg';
                            break;

                        default:
                            console.log('bonk');
                            bonkMember = {
                                "id": id,
                                "name": userNames[i],
                                "bonk": newBonk + 1
                            }
                            response = bonks[Math.floor(Math.random() * bonks.length)];
                            break;
                    }

                    const update = [
                        ...bonkJson.slice(0, objIndex),
                        bonkMember,
                        ...bonkJson.slice(objIndex + 1),
                    ];
                    await fs.promises.writeFile('./bonk.json', JSON.stringify(update, null, '\t'), 'utf8')
                }
            }

            message.channel.send(response);
        }
    }
}