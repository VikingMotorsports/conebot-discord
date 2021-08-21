const { prefix } = require('../config.json');
const fs = require('fs');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('phone')
        .setDescription('Stores your phone number and display it upon calling the command by itself')
        .addStringOption(option =>
            option.setName('store').setDescription('Store your phone number into the database. Use the format 123-456-7890'))
        .addUserOption(option =>
            option.setName('user').setDescription('Get phone number of user')),
    aliases: ['number', 'phonenumber', 'contact'],
    category: 'Team',
    showInHelp: true,
    args: false,
    usage: '123-456-7890 or @username',
    easteregg: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        const numbersBuffer = await fs.promises.readFile('./phones.json');
        let numbers = JSON.parse(numbersBuffer);
        if (!args.length) {
            return await findNumber(message.member)
            // const name = (!message.member.nickname) ? message.author.username : message.member.nickname;
            // const number = numbers[message.author.id];
            // if (!number) return message.channel.send(`No phone number found for ${name}.`);
            // message.channel.send(`${name}'s phone number: ${number}`);
            // return;
        }

        if (message.mentions.users.size > 0) {
            const member = message.mentions.members.first()
            return await findNumber(member)
            // const userIDs = [];
            // const userNames = [];
            // message.mentions.members.map(u => {
            //     const name = (!u.nickname) ? u.user.username : u.nickname;
            //     const id = u.id;
            //     userIDs.push(id);
            //     userNames.push(name);
            // });

            // let reply = '';
            // for (const [i, v] of userIDs.entries()) {
            //     reply += `${userNames[i]}'s phone number: ${numbers[v]}\n`
            // }

            // return message.channel.send(reply);
        }

        if (args.length && args[0].match(/^[2-9]\d{2}-\d{3}-\d{4}$/)) {
            return await storeNumber(message.member, args[0])
            // numbers[message.author.id] = args[0];
            // fs.writeFile('./phones.json', JSON.stringify(numbers, null, '\t'), err => {
            //     if (err) console.error(err);
            //     message.channel.send('Phone number saved.');
            // });
            // return;
        } else {
            return 'Please input your phone number with the following format: `123-456-7890`'
        }
    },
    interact: async interaction => {
        const member = interaction.options.getMember('user')
        const phoneNumber = interaction.options.getString('store')
        const memberToCheck = (member) ? member : interaction.member

        try {
            if (!phoneNumber) return interaction.reply(await findNumber(memberToCheck))
            return interaction.reply(await storeNumber(interaction.member, phoneNumber))
        } catch (error) {
            console.error(error)
            interaction.reply({ content: `Error executing command:\n${codeBlock(error)}`, ephemeral: true })
        }

    }
}

async function findNumber(member) {
    const phoneNumbers = JSON.parse(fs.readFileSync('./phones.json', 'utf-8'))
    const name = (member.nickname) ? member.nickname : member.user.username

    const number = phoneNumbers[member.id];
    if (!number) return `No phone number found for ${name}.`
    return `${name}'s phone number: ${number}`
}

async function storeNumber(member, phone) {
    if (!phone.match(/^[2-9]\d{2}-\d{3}-\d{4}$/)) return { content: 'Please input your phone number with the following format: `123-456-7890`', ephemeral: true }

    const numbers = JSON.parse(fs.readFileSync('./phones.json', 'utf-8'))
    numbers[member.id] = phone
    fs.writeFile('./phones.json', JSON.stringify(numbers, null, '\t'), err => { if (err) console.error(err) })
    return 'Phone number saved.'
}