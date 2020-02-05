module.exports = {
    name: 'handbook',
    aliases: ['memberhandbook', 'newmember', 'newb', 'guide', 'standards'],
    description: 'Link to member handbook',
    easteregg: false,
    execute: async (bot, message, args) => {
        message.channel.send('https://drive.google.com/file/d/1lr2t_iNfYHNScUbYhJmQQfvbMobGajAN/view?usp=sharing');
    }
}