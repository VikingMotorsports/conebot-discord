const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    Collection,
} = require('discord.js');
const { pollsChannel } = require('../config.json');
const fs = require('fs');
const { SlashCommandBuilder, time } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription(
            'Start a poll with up to 10 option, with results collected after the defined time in minutes'
        )
        .addIntegerOption((option) =>
            option
                .setName('minutes')
                .setDescription('Minutes to wait to collect votes')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('question')
                .setDescription('What are you voting on?')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('option1')
                .setDescription('Option 1')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('option2')
                .setDescription('Option 2')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('option3')
                .setDescription('Option 3')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option4')
                .setDescription('Option 4')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option5')
                .setDescription('Option 5')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option6')
                .setDescription('Option 6')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option7')
                .setDescription('Option 7')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option8')
                .setDescription('Option 8')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option9')
                .setDescription('Option 9')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('option10')
                .setDescription('Option 10')
                .setRequired(false)
        ),
    category: 'Server Moderation',
    showInHelp: true,
    args: true,
    usage: '<minutes to wait> "Question" "option 1" "option 2" etc.',
    easteregg: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        const string = message.content.slice(6);
        const regex = /".*?"/g;
        const options = string.match(regex); //! be sure to slice the strings further down the line: String.prototype.slice(1, -1)
        if (isNaN(args[0]))
            return message.channel.send(
                'The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.'
            );
        if (!args[1].includes('"'))
            return message.channel.send(
                'The syntax for polls is `<minutes to wait> "question" "option 1" "option 2" etc` and you need at least 2 options.'
            );
        if (!options)
            return message.channel.send(
                'The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.'
            );
        const question = options.shift().slice(1, -1);
        if (options.length < 2)
            return message.channel.send(
                'The syntax for polls is `<minutes to wait> "Question" "option 1" "option 2" etc` and you need at least 2 options.'
            );
        if (options.length > 10)
            return message.channel.send(
                'Maximum supported number of options is 10.'
            );
        const optionsSliced = [];
        for (const i of options) optionsSliced.push(i.slice(1, -1));

        const channel = message.guild.channels.cache.get(pollsChannel);
        const creator = !message.member.nickname
            ? message.author.username
            : message.member.nickname;

        return await createPoll(
            bot,
            channel,
            creator,
            args[0],
            question,
            optionsSliced
        );
    },
    result: async (bot, question, votes) => {
        const resultsEmbed = new MessageEmbed()
            .setTitle('Poll results')
            .setDescription(question)
            .setColor('#004426');
        for (const v in votes) {
            const option = votes[v]['option'];
            const voters = votes[v]['voters'];
            resultsEmbed.addField(option, `${voters.length}`);
        }

        try {
            const channel = await bot.channels.cache.get(pollsChannel);
            channel.send({ content: '@everyone', embeds: [resultsEmbed] });
        } catch (error) {
            console.error(error);
        }
    },
    interact: async (interaction) => {
        const creator = !interaction.member.nickname
            ? interaction.SlashCommandBuilder.username
            : interaction.member.nickname;
        const minutes = interaction.options.getInteger('minutes');
        const question = interaction.options.getString('question');
        const options = [];
        for (let i = 1; i <= 10; i++) {
            const option = interaction.options.getString(`option${i}`);
            if (option !== null) options.push(option);
        }
        const channel = interaction.guild.channels.cache.get(pollsChannel);

        const reply = await createPoll(
            interaction.client,
            channel,
            creator,
            minutes,
            question,
            options
        );
        interaction.reply(reply);
    },
    cast: async (messageId, option, user) => {
        const polls = JSON.parse(fs.readFileSync('./polls.json', 'utf-8'));
        if (!polls[messageId])
            return { content: 'This poll has already ended.', ephemeral: true };
        for (v in polls[messageId]['votes']) {
            // check for duplicate votes
            const index = polls[messageId]['votes'][v]['voters'].indexOf(user);
            if (index > -1)
                polls[messageId]['votes'][v]['voters'].splice(index, 1);
        }

        polls[messageId]['votes'][option]['voters'].push(user);
        fs.writeFile(
            './polls.json',
            JSON.stringify(polls, null, '\t'),
            (err) => {
                if (err) console.error(err);
            }
        );

        return { content: 'Your vote has been cast!', ephemeral: true };
    },
};

/**
 *
 * @param {Collection} client client object
 * @param {number} minutes Number of minutes to wait for results
 * @param {string} creator Name of the poll creator
 * @param {string} question Question to be asked
 * @param {string[]} options Options to be created
 * @returns reply object
 */
async function createPoll(
    client,
    channel,
    creator,
    minutes,
    question,
    options
) {
    const pollData = JSON.parse(fs.readFileSync('./polls.json', 'utf-8'));
    const date = new Date(Date.now() + minutes * 60000);

    const selectMenu = new MessageSelectMenu()
        .setCustomId('poll-options')
        .setPlaceholder('Pick an option');
    const addOptions = [];
    for (const [i, o] of options.entries()) {
        addOptions.push({
            label: o,
            value: `option${i + 1}`,
        });
    }
    selectMenu.addOptions(addOptions);
    const embed = new MessageEmbed()
        .setTitle(`${creator} created a new poll`)
        .setColor('#004426')
        .setDescription(
            `${question}\n\nResults will be collected on ${time(date)}`
        );
    const row = new MessageActionRow().addComponents(selectMenu);
    const poll = await channel.send({
        content: '@everyone',
        embeds: [embed],
        components: [row],
    });

    const optionsObject = {};
    for (const [i, o] of options.entries()) {
        optionsObject[`option${i + 1}`] = {
            option: o,
            voters: [],
        };
    }
    pollData[poll.id] = {
        time: Date.now() + minutes * 60000,
        question: question,
        votes: optionsObject,
    };
    fs.writeFile(
        './polls.json',
        JSON.stringify(pollData, null, '\t'),
        (err) => {
            if (err) console.error(err);
        }
    );

    return { content: 'Poll created!', ephemeral: true };
}
