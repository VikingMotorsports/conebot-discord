module.exports = {
    data: {
        name: 'greeting',
        description: 'Greets the user'
    },
    aliases: ['greetings', 'morning', 'night', 'afternoon', 'goodmorning', 'goodnight', 'goodafternoon'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        const name = (!message.member.nickname) ? message.author.username : message.member.nickname;
        if (message.content.toLowerCase().includes('good morning')) {
            return message.channel.send(`Good morning, ${name}!`);
        }
        if (message.content.toLowerCase().includes('good night') || message.content.toLowerCase().includes('gnight')) {
            let bye = [`Good night, ${name}.`, `Sweet dreams, ${name}.`, `Have a good night, ${name}`];
            let gn = bye[Math.floor(Math.random() * bye.length)];
            return message.channel.send(gn);
        }
        if (message.content.toLowerCase().includes('good afternoon')) {
            return message.channel.send(`Good afternoon, ${name}`);
        }
    }
}