module.exports = {
    name: 'spongebob',
    aliases: ['spongebobcase', 'retard', 'retardcase', 'sponge'],
    description: 'Converts a string into retarded case',
    args: true,
    usage: 'string',
    easteregg: true,
    execute: async (bot, message, args) => {
        const text = args.join(' ');
        let newText = '"';

        for (let l of text) {
            let caps = Math.round(Math.random());
            if (caps === 1) {
                newText += l.toUpperCase();
            } else {
                newText += l.toLowerCase();
            }
        }

        newText += `" <@${message.author.id}>`;
        
        message.channel.send(newText);
    }
}