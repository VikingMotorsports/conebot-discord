const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = './token.json';
const Discord = require('discord.js');
const { spreadsheetId } = require('../config.json');

module.exports = {
    name: 'po',
    aliases: ['orderinfo', 'status'],
    description: 'Check on the status of a purchase through a PO # lookup',
    category: 'Purchases',
    showInHelp: true,
    args: true,
    usage: '<po number>',
    easteregg: false,
    execute: async (bot, message, args) => {
        const searchingMsg = await message.channel.send('Searching...');
        fs.readFile('./credentials.json', (err, content) => {
            if (err) return console.log('Error loading secret: ', err);
            authorize(JSON.parse(content), readSheet);
        });

        function authorize(credentials, callback) {
            const { client_secret, client_id, redirect_uris } = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) {
                    message.channel.send('Sheets API needs to be authorized. Contact server developers for help.');
                    return getNewToken(oAuth2Client, callback);
                }
                oAuth2Client.setCredentials(JSON.parse(token));
                callback(oAuth2Client);
            });

        }

        function getNewToken(oAuth2Client, callback) {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_types: 'offline',
                scope: SCOPES,
            });
            console.log('Authorize by visiting: ', authUrl);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Enter code here: ', code => {
                rl.close();
                oAuth2Client.getToken(code, (err, token) => {
                    if (err) return console.error(err);
                    oAuth2Client.setCredentials(token);
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                        if (err) return console.error(err);
                        console.log('Token stored to ', TOKEN_PATH);
                    });
                    callback(oAuth2Client);
                });
            });
        }

        function readSheet(auth) {
            const sheets = google.sheets({ version: 'v4', auth });
            sheets.spreadsheets.values.get({
                spreadsheetId: spreadsheetId,
                range: 'Purchases!A1:M'
            }, (err, res) => {
                if (err) {
                    console.log(`API error: ${err}`);
                    return message.channel.send('API error. Contact server developers for help.');
                }
                const rows = res.data.values;
                if (rows.length) {
                    if (args.length > 1) return message.channel.send('Use your PO # to look up the order status. You can only look up one order at a time.');
                    const poNum = rows.map(p => p[0]);
                    const lookup = poNum.indexOf(args[0]);

                    if (lookup == -1) {
                        message.channel.send('No order with that PO # found.');
                        searchingMsg.delete();
                        return;
                    }

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

                    const embed = new Discord.MessageEmbed()
                        .setTitle('Ordering Updates')
                        .setColor('#004426')
                        .addField('Status', status)
                        .addField('PO #', PO)
                        .addField('Subsystem', subsystem)
                        .addField('Item', item)
                        .addField('Vendor', vendor)
                        .addField('Quantity', quantity)
                        .addField('Total Cost', total)
                        .addField('ETA', eta)
                        .addField('Tracking Number', tracking)
                        .addField('Item Link', link);

                    message.channel.send(embed);
                    searchingMsg.delete();
                } else {
                    console.log('No data');
                }
            });
        }
    }
}