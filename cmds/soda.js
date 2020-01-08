const fs = require('fs');

module.exports = {
    name: 'soda',
    aliases: ['beer', 'sodatracker'],
    description: 'Keep track of soda intake and leaderboards',
    args: false,
    usage: 'add [amount]',
    easteregg: true,
    execute: async (bot, message, args) => {
        // const sodaArray = fs.readFile('./soda.json')
        if (!args.length) {
            fs.readFile('./soda.json', (err, data) => {
                const json = JSON.parse(data);
                if (err) return console.error(err);
                // const json = JSON.parse(data);
                if (!json.length) return message.channel.send('Empty... Start drinking!');

            });
        }
        if (args.length && args[0] === 'add') {
            fs.readFile('./soda.json', (err, data) => {
                if (err) return console.error(err);
                const json = JSON.parse(data);
                const ID = message.author.id;
                const NAME = (!message.member.nickname) ? message.author.username : message.member.nickname;
                const objIndex = json.findIndex(obj => obj.id === ID);

            });

            //! simplify logic
            if (!args[1]) {
                fs.readFile('./soda.json', (err, data) => {
                    if (err) return console.error(err);
                    const json = JSON.parse(data);
                    const ID = message.author.id;
                    const NAME = (!message.member.nickname) ? message.author.username : message.member.nickname;
                    const objIndex = json.findIndex(obj => obj.id === ID);
                    console.log(objIndex);
                    console.log(NAME);
                    if (objIndex === -1) {
                        const memberSoda = {
                            "id": ID,
                            "name": NAME,
                            "sodas": 1
                        };
                        json.push(memberSoda);
                        fs.writeFile('./soda.json', JSON.stringify(json), err => {
                            if (err) return console.error(err);
                            message.channel.send(`${NAME} drank a soda.`);
                        });
                    } else {
                        const Sodas = json[objIndex].sodas + 1;
                        // console.log(Sodas);
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
                        console.log(memberSoda);
                        console.log(updatedData);
                        fs.writeFile('./soda.json', JSON.stringify(updatedData), err => {
                            if (err) return console.error(err);
                            message.channel.send(`${NAME} drank a soda.`);
                        });
                    }
                });
            }
        }
    }
}