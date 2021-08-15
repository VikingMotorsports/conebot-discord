const { prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
    data: {
        name: 'phone',
        description: `Stores your phone number and display it upon calling \`${prefix}phone\` by itself`
    },
    aliases: ['number', 'phonenumber', 'contact'],
    category: 'Team',
    showInHelp: true,
    args: false,
    usage: '123-456-7890 or @username',
    easteregg: false,
    execute: async (bot, message, args) => {
        const numbersBuffer = await fs.promises.readFile('./phones.json');
        let numbers = JSON.parse(numbersBuffer);
        if (!args.length) {
            const name = (!message.member.nickname) ? message.author.username : message.member.nickname;
            const number = numbers[message.author.id];
            if (!number) return message.channel.send(`No phone number found for ${name}.`);
            message.channel.send(`${name}'s phone number: ${number}`);
            return;
        }

        if (message.mentions.users.size > 0) {
            const userIDs = [];
            const userNames = [];
            message.mentions.members.map(u => {
                const name = (!u.nickname) ? u.user.username : u.nickname;
                const id = u.id;
                userIDs.push(id);
                userNames.push(name);
            });

            let reply = '';
            for (const [i, v] of userIDs.entries()) {
                reply += `${userNames[i]}'s phone number: ${numbers[v]}\n`
            }

            return message.channel.send(reply);
        }

        if (args.length && args[0].match(/^[2-9]\d{2}-\d{3}-\d{4}$/)) {
            numbers[message.author.id] = args[0];
            fs.writeFile('./phones.json', JSON.stringify(numbers, null, '\t'), err => {
                if (err) console.error(err);
                message.channel.send('Phone number saved.');
            });
            return;
        } else {
            return message.channel.send('Please input your phone number with the following format: `123-456-7890`');
        }
    }
}