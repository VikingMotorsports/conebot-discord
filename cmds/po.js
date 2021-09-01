const fs = require('fs')
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { spreadsheetId, currentPurchaseSheet } = require('../config.json')
const { google } = require('googleapis')
const auth = new google.auth.GoogleAuth({
    keyFile: './keys.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('po')
        .setDescription('Check on the status of a purchase through a PO number lookup')
        .addIntegerOption(option =>
            option.setName('po').setDescription('PO number to lookup (XXXXYY) where XXXX is current season (2122) and YY is assigned number').setRequired(true)),
    aliases: ['orderinfo', 'status'],
    category: 'Purchases',
    showInHelp: true,
    args: true,
    usage: '<po number>',
    easteregg: false,
    isSlashCommand: true,
    execute: async (bot, message, args) => {
        if (!parseInt(args[0])) return 'Please provide PO with format XXXXYY where XXXX is current season (2122 for 2021-2022) and YY is assigned number'
        const waitMessage = await message.channel.send('Searching...')
        const reply = await readSheet(args[0])
        if (reply) waitMessage.delete()
        return reply
    },
    interact: async interaction => {
        const po = interaction.options.getInteger('po')
        await interaction.deferReply()
        const reply = await readSheet(po)
        await interaction.editReply(reply)
    }
}

async function readSheet(po) {
    const authClient = await auth.getClient()
    const sheetsInstance = google.sheets({ version: 'v4', auth: authClient })
    // await interaction.deferReply()

    const readData = await sheetsInstance.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${currentPurchaseSheet}!A1:M`
    })

    const rows = readData.data.values
    if (!rows.length) return { content: 'No data', ephemeral: true }
    // interaction.reply('read')

    const poNum = rows.map(p => p[0])
    const lookup = poNum.indexOf(`${po}`)
    // console.log(rows, lookup)

    if (lookup === -1) return { content: 'No order found with that PO number', ephemeral: true }

    const status = rows[lookup][10];
    const PO = rows[lookup][0];
    const subsystem = rows[lookup][4];
    const item = rows[lookup][1];
    const vendor = rows[lookup][2];
    const quantity = rows[lookup][5];
    const total = rows[lookup][8];
    const eta = rows[lookup][11] || 'N/A';
    const tracking = rows[lookup][12] || 'N/A';
    const link = rows[lookup][3];

    const embed = new MessageEmbed().setTitle('Ordering Updates').setColor('#004426')
        .addField('Status', status)
        .addField('PO #', PO)
        .addField('Subsystem', subsystem)
        .addField('Item', item)
        .addField('Vendor', vendor)
        .addField('Quantity', quantity)
        .addField('Total Cost', total)
        .addField('ETA', eta)
        .addField('Tracking Number', tracking)
        .addField('Item Link', link)

    return { embeds: [embed] }
}