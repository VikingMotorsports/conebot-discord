const axios = require('axios');

module.exports = {
    name: 'joke',
    aliases: ['programmerjoke', 'jokes', 'programmerjokes'],
    description: 'Cheesy programmer jokes',
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