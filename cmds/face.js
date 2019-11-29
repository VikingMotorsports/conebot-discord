const fs = require('fs');
const axios = require('axios');
const path = require('path');

module.exports = {
    name: 'face',
    aliases: ['faces', 'pp', 'dp', 'profilepicture', 'displaypicture', 'avatar'],
    description: 'Upload or show picture of your face for identifying purposes',
    usage: '<@user> or [attachment]',
    easteregg: false,
    execute: async (message, args) => {
        const authorID = message.author.id;
        if (args.length && args[0] === 'remove') { //* delete picture logic
            fs.readdir('./faces', (err, files) => {
                const file = files.filter(f => {
                    return path.basename(f).includes(authorID);
                });
                if (file.length >= 1) {
                    fs.unlink(`./faces/${file[0]}`, err => {
                        if (err) return console.error(err);
                        message.channel.send('Picture removed.');
                    });
                } else {
                    message.channel.send('No picture found.')
                }
            });
        } else if (message.mentions.users.first()) {
            const userID = message.mentions.users.first().id;
            fs.readdir('./faces', async (err, files) => {
                const file = files.filter(f => {
                    return path.basename(f).includes(userID);
                });
                if (file.length >= 1) {
                    const retrieveMsg = await message.channel.send('Retrieving...');
                    let nickname;
                    if (message.mentions.members.first().nickname) {
                        nickname = message.mentions.members.first().nickname;
                    } else {
                        nickname = message.mentions.users.first().username;
                    }
                    // console.log(file);
                    message.channel.send(`Picture of ${nickname}`, {
                        files: [{
                            attachment: `./faces/${file[0]}`,
                            name: file[0]
                        }]
                    });

                    retrieveMsg.delete();
                } else {
                    // console.log('not found');
                    message.channel.send(`No picture found.`);
                }
            });
        } else if (!message.mentions.users.first()) {
            if (message.attachments.first()) {
                //* Upload logic
                const fileSize = message.attachments.first().filesize;
                const imgURL = message.attachments.first().url;
                const fileName = message.attachments.first().filename;
                const fileType = fileName.split('.').pop();

                fs.readdir('./faces', (err, files) => {
                    const file = files.filter(f => {
                        return path.basename(f).includes(authorID);
                    });
                    if (file.length >= 1) {
                        message.channel.send('You already uploaded a picture. Type `!face remove` to remove the existing picture.');
                    } else {
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
                    }
                });
            } else { //* attachment logic
                fs.readdir('./faces', async (err, files) => {
                    const file = files.filter(f => {
                        return path.basename(f).includes(authorID);
                    });
                    if (file.length >= 1) {
                        const retrieveMsg = await message.channel.send('Retrieving...');
                        let nickname;
                        if (message.member.nickname) {
                            nickname = message.member.nickname;
                        } else {
                            nickname = message.author.username;
                        }
                        // console.log(file);
                        message.channel.send(`Picture of ${nickname}`, {
                            files: [{
                                attachment: `./faces/${file[0]}`,
                                name: file[0]
                            }]
                        });
                        retrieveMsg.delete();
                    } else {
                        // console.log('not found');
                        message.channel.send(`No picture found.`);
                    }
                });
            }
        }
    }
}