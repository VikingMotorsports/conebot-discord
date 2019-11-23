const axios = require('axios');

module.exports = {
    name: 'joke',
    aliases: ['programmerjoke', 'jokes', 'programmerjokes'],
    description: 'Cheesy programmer jokes',
    easteregg: true,
    execute(message, args) {
        axios.get('https://official-joke-api.appspot.com/jokes/programming/random').then(res => {
            const joke = res.data[0];
            message.channel.send(`${joke.setup}\n\n${joke.punchline}`);
        });
    }
}