const {
    prefix
} = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'email',
    aliases: ['emails', 'mail'],
    description: `Stores your email and display it upon calling \`${prefix}email\` by itself`,
    args: false,
    usage: '<email address> or @username',
    easteregg: false,
    execute: async (bot, message, args) => {
        if (!args.length) {
            const name = (!message.member.nickname) ? message.author.username : message.member.nickname;
            fs.readFile('./emails.json', (err, data) => {
                if (err) console.error(err);
                const json = JSON.parse(data);
                const email = json[message.author.id];
                if (!email) return message.channel.send(`No email found for ${name}.`);
                message.channel.send(`${name}'s email address: ${email}`);
            });
            return;
        }

        if (message.mentions.users.size > 0) {
            message.mentions.members.map(user => {
                const name = (!user.nickname) ? user.user.username : user.nickname;
                fs.readFile('./emails.json', (err, data) => {
                    if (err) console.error(err);
                    const json = JSON.parse(data);
                    const email = json[user.id];
                    if (!email) return message.channel.send(`No email found for ${name}.`);
                    message.channel.send(`${name}'s email address: ${email}`);
                });
            });
            return;
        }

        if (args.length && args[0].match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)) {
            fs.readFile('./emails.json', (err, data) => {
                if (err) console.error(err);
                let json = JSON.parse(data);
                json[message.author.id] = args[0];
                fs.writeFile('./emails.json', JSON.stringify(json), err => {
                    if (err) console.error(err);
                    message.channel.send('Email saved.');
                });
            });
            return;
        } else {
            message.channel.send('Please input a valid email address.');
        }
    }
}