const {
    Client,
    MessageActionRow,
    MessageButton,
    Intents,
} = require('discord.js');
const { token, rulesChannel } = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    allowedMentions: {
        parse: ['roles', 'everyone', 'users'],
        repliedUser: true,
    },
});

client.login(token);

client.once('ready', async () => {
    // const channel = (await client.channels.fetch(rulesChannel)).fetch();
    const channel = await client.channels.fetch(rulesChannel);
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('join')
            .setLabel('I agree')
            .setStyle('PRIMARY')
    );

    const message = {
        content:
            "Click the button below if you agree to the rules above and are ready to participate. If nothing happens within a minute and you don't see the other channels, please message one of the Leadership members.",
        components: [row],
    };
    await channel.send(message);

    // client.destroy();
});
