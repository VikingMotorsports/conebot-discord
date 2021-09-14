const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { bonks, superbonks, unbonk } = require('../links.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('Bonk someone')
        .addSubcommand(subcommand =>
            subcommand.setName('user')
            .setDescription('Bonk a user')
            .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('leaderboard')
            .setDescription('Show bonk leaderboard')),
    category: 'Miscellaneous',
    usage: '@user or count <@user>',
    args: true,
    showInHelp: false,
    easteregg: true,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        const data = await fs.promises.readFile('./bonk.json')
        const json = JSON.parse(data);
        let response = '';

        if (args[0] === 'leaderboard') {
            return await showLeaderboard();
        }
        if (message.mentions.users.size > 0) {
            const userIDs = [];
            const userNames = [];
            message.mentions.members.map(u => {
                const name = !u.nickname ? u.user.username : u.nickname;
                const id = u.id;
                userIDs.push(id);
                userNames.push(name);
            });
            for ([i, id] of userIDs.entries()) {
                const bonkData = await fs.promises.readFile('./bonk.json');
                let bonkJson = JSON.parse(bonkData);
                const objIndex = bonkJson.findIndex(o => o.id === id);
                let bonkMember;
                if (objIndex === -1) {
                    bonkMember = {
                        "id": id,
                        "name": userNames[i],
                        "bonk": 1
                    }

                    bonkJson.push(bonkMember);
                    await fs.promises.writeFile('./bonk.json', JSON.stringify(bonkJson, null, '\t'), 'utf8')
                    response = bonks[Math.floor(Math.random() * bonks.length)];
                } else {
                    let newBonk = bonkJson[objIndex].bonk;
                    const superbonkRoll = Math.floor(Math.random() * 15);
                    const unbonkRoll = Math.floor(Math.random() * 10);

                    let bonkCase = '';
                    if (unbonkRoll === 0) bonkCase = 'unbonk';
                    if (superbonkRoll === 0) bonkCase = 'superbonk';

                    switch (bonkCase) {
                        case 'unbonk':
                            // console.log('unbonk');
                            bonkMember = {
                                "id": id,
                                "name": userNames[i],
                                "bonk": newBonk - 1
                            }
                            response = unbonk[Math.floor(Math.random() * unbonk.length)]
                            break;

                        case 'superbonk':
                            bonkMember = {
                                "id": id,
                                "name": userNames[i],
                                "bonk": newBonk + 5
                            }
                            response = superbonks[Math.floor(Math.random() * superbonks.length)]
                            break;

                        default:
                            // console.log('bonk');
                            bonkMember = {
                                "id": id,
                                "name": userNames[i],
                                "bonk": newBonk + 1
                            }
                            response = bonks[Math.floor(Math.random() * bonks.length)];
                            break;
                    }

                    const update = [
                        ...bonkJson.slice(0, objIndex),
                        bonkMember,
                        ...bonkJson.slice(objIndex + 1),
                    ];
                    await fs.promises.writeFile('./bonk.json', JSON.stringify(update, null, '\t'), 'utf8')
                }
            }

            return response;
        }
    },
    interact: async (interaction) => {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getMember('target');
        let userName;
        if (user != null) userName = (user.nickname) ? user.nickname : user.user.username


        if (subCommand === 'leaderboard') {
            const reply = await showLeaderboard();
            interaction.reply(reply);
        }
        if (subCommand === 'user') {
            const reply = await bonk({ id: user.id, name: userName });
            interaction.reply(reply);
        }
    }
}

/**
 * 
 * @returns reply object
 */
async function showLeaderboard() {
    const bonks = JSON.parse(fs.readFileSync('./bonk.json', 'utf-8'));

    const sortedBonks = bonks.slice(0).sort((a, b) => {
        return b.bonk - a.bonk;
    });

    const leaderboard = [];
    for (b of sortedBonks) leaderboard.push(`${b.name} = ${b.bonk}`);

    const total = sortedBonks.map(s => s.bonk).reduce((a, b) => a + b);

    const embed = new MessageEmbed().setTitle(`Bonk'd Hall of Shame`).setColor('#96031A')
        .setDescription(leaderboard.join('\n'))
        .setFooter(`Total bonks: ${total}`);

    return { embeds: [embed] };
}

/**
 * 
 * @param {Object} user user object
 * @param {string} user.id Discord ID of the user
 * @param {string} user.name Name of the user
 * @returns Response string
 */
async function bonk(user) {
    const bonkData = JSON.parse(fs.readFileSync('./bonk.json', 'utf-8'));
    const index = bonkData.findIndex(b => b.id === user.id);
    let bonkMember;
    let response = '';

    if (index === -1) {
        bonkMember = {
            "id": user.id,
            "name": user.name,
            "bonk": 1
        }

        bonkData.push(bonkMember);
        fs.writeFile('./bonk.json', JSON.stringify(bonkData, null, '\t'), err => { if (err) console.error(err) });
        response = bonks[Math.floor(Math.random() * bonks.length)];
    } else {
        let currentBonk = bonkData[index].bonk;
        const superbonkRoll = Math.floor(Math.random() * 15);
        const unbonkRoll = Math.floor(Math.random() * 10);

        let bonkCase = ''
        if (unbonkRoll === 0) bonkCase = 'unbonk';
        if (superbonkRoll === 0) bonkCase = 'superbonk';

        switch (bonkCase) {
            case 'unbonk':
                bonkMember = {
                    "id": user.id,
                    "name": user.name,
                    "bonk": currentBonk - 1
                }
                response = unbonk[Math.floor(Math.random() * unbonk.length)]
                break;

            case 'superbonk':
                bonkMember = {
                    "id": user.id,
                    "name": user.name,
                    "bonk": currentBonk + 5
                }
                response = superbonks[Math.floor(Math.random() * superbonks.length)]
                break;

            default:
                bonkMember = {
                    "id": user.id,
                    "name": user.name,
                    "bonk": currentBonk + 1
                }
                response = bonks[Math.floor(Math.random() * bonks.length)];
                break;
        }

        const update = [
            ...bonkData.slice(0, index),
            bonkMember,
            ...bonkData.slice(index + 1),
        ];
        fs.writeFile('./bonk.json', JSON.stringify(update, null, '\t'), err => { if (err) console.error(err) });
    }

    return response;
}