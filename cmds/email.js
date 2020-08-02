const { prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'email',
    aliases: ['emails', 'mail'],
    description: `Stores your email and display it upon calling \`${prefix}email\` by itself`,
    category: 'Team',
    showInHelp: true,
    args: false,
    usage: '<email address> or @username',
    easteregg: false,
    execute: async (bot, message, args) => {
        let json = await fs.promises.readFile('./emails.json');
        let emails = JSON.parse(json);
        if (!args.length) {
            const name = (!message.member.nickname) ? message.author.username : message.member.nickname;
            const email = emails[message.author.id];
            if (!email) return message.channel.send(`No email found for ${name}.`);
            message.channel.send(`${name}'s email address: ${email}`);
            return
        }

        if (message.mentions.users.size > 0) {
            message.mentions.members.map(user => {
                const name = (!user.nickname) ? user.user.username : user.nickname;
                const email = emails[user.id];
                if (!email) return message.channel.send(`No email found for ${name}.`);
                message.channel.send(`${name}'s email address: ${email}`);
            });
            return;
        }

        if (args.length && args[0].match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)) {
            emails[message.author.id] = args[0];
            fs.writeFile('./emails.json', JSON.stringify(emails, null, '\t'), err => {
                if (err) console.error(err);
                message.channel.send('Email saved.');
            });
            return;
        } else {
            return message.channel.send('Please input a valid email address.');
        }
    }
}