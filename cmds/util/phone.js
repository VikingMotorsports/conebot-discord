/**
 * @file Stores and retrieves user phone numbers.
 *
 * Prefix command:
 * <prefix>phone                    Retrieve own phone.
 * <prefix>phone <@user>            Retrieve phone for user.
 * <prefix>phone <xxx-xxx-xxx>      Store/update own phone.
 *
 * Slash command:
 * /phone                           Retrieve own phone.
 * /phone user:@user                Retrieve phone for user.
 * /phone store:xxx-xxx-xxx         Store/update own phone.
 */

const fs = require('node:fs');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('phone')
        .setDescription(
            'Stores your phone number and display it upon calling the command by itself'
        )
        .addStringOption((option) =>
            option
                .setName('store')
                .setDescription(
                    'Store your phone number into the database. Use the format 123-456-7890'
                )
        )
        .addUserOption((option) =>
            option.setName('user').setDescription('Get phone number of user')
        ),
    aliases: ['number', 'phonenumber', 'contact'],
    category: 'Team',
    showInHelp: true,
    args: false,
    usage: '123-456-7890 or @username',
    easteregg: false,
    isSlashCommand: true,
    execute: async (_bot, message, args) => {
        if (!args.length) {
            return findNumber(message.member);
        }

        if (message.mentions.users.size > 0) {
            const member = message.mentions.members.first();
            return findNumber(member);
        }

        return storeNumber(message.member, args[0]);
    },
    interact: async (interaction) => {
        const mentionedUser = interaction.options.getMember('user');
        const phone = interaction.options.getString('store');

        if (!mentionedUser)
            await interaction.reply(findNumber(interaction.member));
        else if (phone !== null)
            await interaction.reply(storeNumber(interaction.user, phone));
        else if (mentionedUser !== null)
            await interaction.reply(findNumber(mentionedUser));
    },
    help: () => {
        return `
        Stores and retrieves user phone numbers.

        **Prefix command:**
        \`<prefix>phone\` -                    Retrieve own phone.
        \`<prefix>phone <@user>\` -            Retrieve phone for user.
        \`<prefix>phone <xxx-xxx-xxx>\` -      Store/update own phone.

        **Slash command:**
        \`/phone\` -                           Retrieve own phone.
        \`/phone user:@user\` -                Retrieve phone for user.
        \`/phone store:xxx-xxx-xxx\` -         Store/update own phone.`;
    },
};

/**
 * @param {Object} member memebr collection from discord
 * @returns reply object
 */
function findNumber(member) {
    const phoneNumbers = JSON.parse(fs.readFileSync('./phones.json', 'utf-8'));
    const name = member.nickname ?? member.user.username;
    const number = phoneNumbers[member.user.id];

    if (!number) return `No phone number found for ${name}.`;
    return `${name} 's phone number: ${number}`;
}
/**
 * @param {Object} user user collection from discord
 * @param {string} phone phone string to store
 * @returns reply object
 */
function storeNumber(user, phone) {
    const phones = JSON.parse(fs.readFileSync('./phones.json', 'utf-8'));
    if (!phone.match(/^[2-9]\d{2}-\d{3}-\d{4}$/))
        return {
            content:
                'Please input your phone number with the following format: `123-456-7890`',
            flags: MessageFlags.Ephemeral,
        };

    phones[user.id] = phone;
    fs.writeFile('./phones.json', JSON.stringify(phones, null, '\t'), (err) => {
        if (err) console.error(err);
    });

    return { content: 'Phone number saved.', flags: MessageFlags.Ephemeral };
}
