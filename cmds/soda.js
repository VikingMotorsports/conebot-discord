const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'soda',
    aliases: ['sodatracker', 'drink'],
    description: 'Keep track of soda intake and leaderboard',
    category: 'Miscellaneous',
    showInHelp: true,
    args: false,
    usage: 'drink <integer(optional)>',
    easteregg: true,
    execute: async (bot, message, args) => {
        if (!args.length) {
            fs.readFile('./soda.json', (err, data) => {
                if (err) return console.error(err);
                const json = JSON.parse(data);
                if (!json.length) return message.channel.send('Empty... Start drinking!');

                const sorted = json.slice(0).sort((a, b) => {
                    return b.sodas - a.sodas;
                });
                // console.log(sorted);

                let leaderboard = '';
                for (const d of sorted) {
                    leaderboard = leaderboard + `${d.sodas} - ${d.name}\n`;
                }

                const totalSodas = sorted.map(s => s.sodas).reduce((a, b) => a + b);
                const totalLiters = totalSodas * 0.355;
                // console.log(totalSodas);
                // console.log(leaderboard.slice(0, -1));

                const leaderboardEmbed = new Discord.RichEmbed()
                    .setTitle('Soda Leaderboard')
                    .setColor('#96031A')
                    .setDescription(leaderboard.slice(0, -1))
                    .addField('Total Volume', `The team has collectively drank ${totalLiters.toFixed(2)} liters.`)
                    .setFooter('Based on average volume of 355 ml per drink');
                message.channel.send(leaderboardEmbed);
            });
        }
        try {
            if (args.length && args[0] === 'drink') {
                fs.readFile('./soda.json', (err, data) => {
                    if (err) return console.error(err);
                    const json = JSON.parse(data);
                    const ID = message.author.id;
                    const NAME = (!message.member.nickname) ? message.author.username : message.member.nickname;
                    const objIndex = json.findIndex(obj => obj.id === ID);

                    if (objIndex === -1) {
                        let Sodas;
                        let reply;
                        if (args[1] && parseInt(args[1]) <= 0) return message.channel.send('You can\'t do that.');
                        if (!args[1] || parseInt(args[1]) === 1) {
                            Sodas = +1;
                            const Liters = Sodas * 0.355;
                            reply = `${NAME} drank a soda. They have drank a total of ${Liters.toFixed(2)} liters.`;
                        } else if (!isNaN(args[1]) && parseInt(args[1]) > 1) {
                            Sodas = +parseInt(args[1]);
                            const Liters = Sodas * 0.355;
                            reply = `${NAME} drank ${args[1]} sodas. They have drank a total of ${Liters.toFixed(2)} liters.`;
                        }
                        const memberSoda = {
                            "id": ID,
                            "name": NAME,
                            "sodas": parseInt(Sodas)
                        };

                        json.push(memberSoda);
                        fs.writeFile('./soda.json', JSON.stringify(json, null, '\t'), err => {
                            if (err) return console.error(err);
                            message.channel.send(reply);
                        });
                    } else {
                        let Sodas = json[objIndex].sodas;
                        let reply;
                        if (args[1] && parseInt(args[1]) <= 0) return message.channel.send('You can\'t do that.');
                        if (!args[1] || parseInt(args[1]) === 1) {
                            Sodas = Sodas + 1;
                            const Liters = Sodas * 0.355;
                            reply = `${NAME} drank a soda. They have drank a total of ${Liters.toFixed(2)} liters.`;
                        } else if (!isNaN(args[1]) && parseInt(args[1]) > 1) {
                            Sodas = Sodas + parseInt(args[1]);
                            const Liters = Sodas * 0.355;
                            reply = `${NAME} drank ${args[1]} sodas. They have drank a total of ${Liters.toFixed(2)} liters.`;
                        }
                        const memberSoda = {
                            "id": ID,
                            "name": NAME,
                            "sodas": parseInt(Sodas)
                        };
                        const updatedData = [
                            ...json.slice(0, objIndex),
                            memberSoda,
                            ...json.slice(objIndex + 1),
                        ];

                        fs.writeFile('./soda.json', JSON.stringify(updatedData, null, '\t'), err => {
                            if (err) return console.error(err);
                            message.channel.send(reply);
                        });
                    }
                });
            }
        } catch (error) {
            console.error(error);
            bot.guilds.first().members.get('197530293597372416').send(`soda error\n\n${error}`);
        }

    }
}