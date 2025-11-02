/**
 * @file Stores and retrieves user emails.
 *
 * Prefix command:
 * <prefix>email            Retrieve own email.
 * <prefix>email <@user>    Retrieve email for user.
 * <prefix>email <email>    Store/update own email.
 *
 *
 * Slash command:
 * /email                   Retrieve own email.
 * /email user:@user        Retrieve email for user.
 * /email store:email       Store/update own email.
 */

const fs = require('node:fs');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription(
            'Stores your email and displays it upon calling the command by itself'
        )
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Get email of user')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('store')
                .setDescription('Input your email to store to the database')
                .setRequired(false)
        ),
    aliases: ['emails', 'mail'],
    category: 'Team',
    showInHelp: true,
    args: false,
    usage: '<email address> or @username',
    easteregg: false,
    isSlashCommand: true,
    execute: async (_bot, message, args) => {
        if (!args.length) {
            return findEmail(message.member);
        }

        if (message.mentions.users.size > 0) {
            const member = message.mentions.members.first();
            return findEmail(member);
        }

        return storeEmail(message.author, args[0]);
    },
    interact: async (interaction) => {
        const mentionedUser = interaction.options.getMember('user');
        const email = interaction.options.getString('store');

        if (!mentionedUser && !email)
            await interaction.reply(findEmail(interaction.member));
        else if (email !== null)
            await interaction.reply(storeEmail(interaction.user, email));
        else if (mentionedUser !== null)
            await interaction.reply(findEmail(mentionedUser));
    },
};

/**
 * @param {Object} member member collection from discord
 * @returns reply object
 */
function findEmail(member) {
    const emails = JSON.parse(fs.readFileSync('./emails.json', 'utf-8'));
    const name = member.nickname ?? member.user.username;
    const email = emails[member.user.id];

    if (!email) return `No email found for ${name}.`;
    return `${name}'s email address: ${email}`;
}

/**
 * @param {Object} user user collection from discord
 * @param {string} email email string to store
 * @returns reply object
 */
function storeEmail(user, email) {
    const emails = JSON.parse(fs.readFileSync('./emails.json', 'utf-8'));
    if (!email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/))
        return {
            content: 'Please input a valid email address.',
            flags: MessageFlags.Ephemeral,
        };

    emails[user.id] = email;
    fs.writeFile('./emails.json', JSON.stringify(emails, null, '\t'), (err) => {
        if (err) console.error(err);
    });

    return { content: 'Email saved.', flags: MessageFlags.Ephemeral };
}
