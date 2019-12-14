const {
    prefix
} = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'phone',
    aliases: ['number', 'phonenumber', 'contact'],
    description: `Stores your phone number and display it upon calling \`${prefix}phone\` by itself`,
    args: false,
    usage: '123-456-7890',
    easteregg: false,
    execute: async (message, args) => {
        if (!args.length) {
            const name = (!message.member.nickname) ? message.author.username : message.member.nickname;
            fs.readFile('./phones.json', (err, data) => {
                if (err) throw err;
                const json = JSON.parse(data);
                const number = json[message.author.id];
                if (!number) return message.channel.send('No phone number found.');
                message.channel.send(`${name}'s phone number: ${number}`);
            });
        }

        if (message.mentions.users.size > 0) {
            const mentionList = message.mentions.members.map(user => {
                const name = (!user.nickname) ? user.user.username : user.nickname;
                fs.readFile('./phones.json', (err, data) => {
                    if (err) throw err;
                    const json = JSON.parse(data);
                    const number = json[user.id];
                    if (!number) return message.channel.send('No phone number found.');
                    return message.channel.send(`${name}'s phone number: ${number}`);
                });
            });
        }

        if (args.length && args[0].match(/^[2-9]\d{2}-\d{3}-\d{4}$/)) {
            fs.readFile('./phones.json', (err, data) => {
                if (err) throw err;
                let json = JSON.parse(data);
                json[message.author.id] = args[0];
                fs.writeFile('./phones.json', JSON.stringify(json), err => {
                    if (err) throw err;
                    message.channel.send('Phone number saved.');
                });
            });
        } else if (args.length && message.mentions.users.size === 0 && !args[0].match(/^[2-9]\d{2}-\d{3}-\d{4}$/)) {
            message.channel.send('Please input your phone number with the following format: `123-456-7890`');
        }
    }
}