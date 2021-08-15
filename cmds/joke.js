const axios = require('axios');

module.exports = {
    data: {
        name: 'joke',
        description: 'Cheesy programmer jokes'
    },
    aliases: ['programmerjoke', 'jokes', 'programmerjokes'],
    showInHelp: false,
    easteregg: true,
    execute: async (bot, message, args) => {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random')
            const joke = response.data[0];
            message.channel.send(`${joke.setup}\n\n${joke.punchline}`);
        } catch (error) {
            console.error(error);
        }
    }
}