module.exports = {
    data: {
        name: 'mock',
        description: 'Converts a string into random case',
    },
    aliases: ['spongebobcase', 'sponge'],
    showInHelp: false,
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

        return newText;
    },
};
