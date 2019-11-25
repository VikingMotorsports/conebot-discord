const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');
const path = require('path');

module.exports = {
    name: 'face',
    aliases: ['faces', 'pp', 'dp', 'profilepicture', 'displaypicture', 'avatar'],
    description: 'Upload or show picture of your face for identifying purposes',
    usage: '<@user> or [attachment]',
    easteregg: false,
    execute(message, args) {
        const authorID = message.author.id;
        if (!message.mentions.users.first()) {
            if (message.attachments.first()) {
                // console.log(message.attachments.first().filesize);
                const fileSize = message.attachments.first().filesize;
                const imgURL = message.attachments.first().url;
                const fileName = message.attachments.first().filename;
                const fileType = fileName.split('.').pop();

                if ((fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') && fileSize <= 2097152) {
                    axios({
                        method: 'get',
                        url: imgURL,
                        responseType: 'stream'
                    }).then(res => {
                        res.data.pipe(fs.createWriteStream(`./faces/${authorID}.${fileType}`));
                    }).then(message.channel.send('Image saved to database.')).catch(console.error);
                } else {
                    message.channel.send('Please upload an image with file type jpg or png that is less than 2MB.');
                }
            } else {
                fs.readdir('./faces', (err, files) => {
                    const file = files.filter(f => {
                        return path.basename(f).includes(authorID);
                    });
                    if (file.length == 1) {
                        // console.log(file);
                        message.channel.send(`Picture of ${message.author.username}`, {
                            files: [{
                                attachment: `./faces/${file[0]}`,
                                name: file[0]
                            }]
                        });
                    } else {
                        // console.log('not found');
                        message.channel.send(`No picture found.`);
                    }
                });
            }
        } else if (message.mentions.users.first()) {
            const userID = message.mentions.users.first().id;
            fs.readdir('./faces', (err, files) => {
                const file = files.filter(f => {
                    return path.basename(f).includes(userID);
                });
                if (file.length == 1) {
                    // console.log(file);
                    message.channel.send(`Picture of ${message.mentions.users.first().username}`, {
                        files: [{
                            attachment: `./faces/${file[0]}`,
                            name: file[0]
                        }]
                    });
                } else {
                    // console.log('not found');
                    message.channel.send(`No picture found.`);
                }
            });

        }
    }
}