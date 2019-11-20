module.exports = {
    name: 'greeting',
    aliases: ['greetings', 'morning', 'night', 'afternoon', 'goodmorning', 'goodnight', 'goodafternoon'],
    description: 'Greets the user',
    execute(message, args) {
        if (message.content.toLowerCase().includes('good morning')) {
            return message.channel.send(`Good morning, ${message.author.username}!`);
        }
        if (message.content.toLowerCase().includes('good night' || 'gnight')) {
            let name = message.author.username;
            let bye = [`Good night, ${name}.`, `Sweet dreams, ${name}.`, `Have a good night, ${name}`];
            let gn = bye[Math.floor(Math.random() * bye.length)];
            return message.channel.send(gn);
        }
        if (message.content.toLowerCase().includes('good afternoon')) {
            return message.channel.send(`Good afternoon, ${message.author.username}`);
        }
    }
}