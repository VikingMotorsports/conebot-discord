const fs = require("fs");
const axios = require("axios");
const path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("face")
    // .setDescription('Upload or show picture of your face for identifying purposes'),
    .setDescription("Face functionality is currently disabled."),
  aliases: ["faces", "pp", "dp", "profilepicture", "displaypicture", "avatar"],
  category: "Team",
  showInHelp: true,
  usage: "<@user> or [attachment]",
  easteregg: false,
  execute: async (bot, message, args) => {
    return "Face functionality is currently disabled.";
  },
  // execute: async (bot, message, args) => {
  //     const authorID = message.author.id;
  //     if (args.length && args[0] === 'remove') { //* delete picture logic
  //         fs.readdir('./faces', (err, files) => {
  //             const file = files.filter(f => {
  //                 return path.basename(f).includes(authorID);
  //             });
  //             if (file.length >= 1) {
  //                 fs.unlink(`./faces/${file[0]}`, err => {
  //                     if (err) return console.error(err);
  //                     // message.channel.send('Picture removed.');
  //                     return 'Picture removed.'
  //                 });
  //             } else {
  //                 // message.channel.send('No picture found.')
  //                 return 'No picture found.'
  //             }
  //         });
  //     } else if (message.mentions.users.first()) {
  //         const userID = message.mentions.users.first().id;
  //         fs.readdir('./faces', async (err, files) => {
  //             const file = files.filter(f => {
  //                 return path.basename(f).includes(userID);
  //             });
  //             if (file.length >= 1) {
  //                 const retrieveMsg = await message.channel.send('Retrieving...');
  //                 const nickname = (!message.mentions.members.first().nickname) ? message.mentions.users.first().username : message.mentions.members.first().nickname;
  //                 message.channel.send(`Picture of ${nickname}`, {
  //                     files: [{
  //                         attachment: `./faces/${file[0]}`,
  //                         name: file[0]
  //                     }]
  //                 });

  //                 retrieveMsg.delete();
  //             } else {
  //                 message.channel.send(`No picture found.`);
  //             }
  //         });
  //     } else if (!message.mentions.users.first()) {
  //         if (message.attachments.first()) {
  //             //* Upload logic
  //             const fileSize = message.attachments.first().filesize;
  //             const imgURL = message.attachments.first().url;
  //             const fileName = message.attachments.first().filename;
  //             const fileType = fileName.split('.').pop();

  //             fs.readdir('./faces', (err, files) => {
  //                 const file = files.filter(f => {
  //                     return path.basename(f).includes(authorID);
  //                 });
  //                 if (file.length >= 1) {
  //                     message.channel.send('You already uploaded a picture. Type `!face remove` to remove the existing picture.');
  //                 } else {
  //                     if ((fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') && fileSize <= 2097152) {
  //                         axios({
  //                             method: 'get',
  //                             url: imgURL,
  //                             responseType: 'stream'
  //                         }).then(res => {
  //                             res.data.pipe(fs.createWriteStream(`./faces/${authorID}.${fileType}`));
  //                         }).then(message.channel.send('Image saved to database.')).catch(console.error);
  //                     } else {
  //                         message.channel.send('Please upload an image with file type jpg or png that is less than 2MB.');
  //                     }
  //                 }
  //             });
  //         } else { //* attachment logic
  //             fs.readdir('./faces', async (err, files) => {
  //                 const file = files.filter(f => {
  //                     return path.basename(f).includes(authorID);
  //                 });
  //                 if (file.length >= 1) {
  //                     const retrieveMsg = await message.channel.send('Retrieving...');
  //                     const nickname = (!message.member.nickname) ? message.author.username : message.member.nickname;
  //                     message.channel.send(`Picture of ${nickname}`, {
  //                         files: [{
  //                             attachment: `./faces/${file[0]}`,
  //                             name: file[0]
  //                         }]
  //                     });
  //                     retrieveMsg.delete();
  //                 } else {
  //                     message.channel.send(`No picture found.`);
  //                 }
  //             });
  //         }
  //     }
  // }
};
