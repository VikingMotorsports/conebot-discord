const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription('Stores your email and display it upon calling the command by itself')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Get email of user')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('store')
                .setDescription('Input your email to store to the database')
                .setRequired(false)),
    aliases: ['emails', 'mail'],
    category: 'Team',
    showInHelp: true,
    args: false,
    usage: '<email address> or @username',
    easteregg: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        let json = await fs.promises.readFile('./emails.json');
        let emails = JSON.parse(json);
        if (!args.length) {
            return await findEmail(message.member);
        }

        if (message.mentions.users.size > 0) {
            const user = message.mentions.members.first();
            return await findEmail(user);
        }

        if (args.length && args[0].match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)) {
            return await (storeEmail(message.author, args[0]))
        }
    },
    interact: async (interaction) => {
        const mentionedUser = interaction.options.getMember('user');
        const email = interaction.options.getString('store');

        if (!mentionedUser && !email) interaction.reply(await findEmail(interaction.member))
        else if (email !== null) interaction.reply(await storeEmail(interaction.user, email));
        else if (mentionedUser !== null) interaction.reply(await findEmail(mentionedUser));
    }
}

/**
 * 
 * @param {Object} user user collection from discord
 * @returns reply object
 */
async function findEmail(user) {
    const emails = JSON.parse(fs.readFileSync('./emails.json', 'utf-8'));
    const name = (!user.nickname) ? user.user.username : user.nickname;
    const email = emails[user.id];

    if (!email) return `No email found for ${name}.`;
    return `${name}'s email address: ${email}`;
}

/**
 * 
 * @param {Object} user user collection from discord
 * @param {string} email email string to store
 * @returns reply object
 */
async function storeEmail(user, email) {
    const emails = JSON.parse(fs.readFileSync('./emails.json', 'utf-8'));
    if (!email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)) return { content: 'Please input a valid email address.', ephemeral: true };

    emails[user.id] = email;
    fs.writeFile('./emails.json', JSON.stringify(emails, null, '\t'), err => { if (err) console.error(err) });

    return { content: 'Email saved.', ephemeral: true };
}
