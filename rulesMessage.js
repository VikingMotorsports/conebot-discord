const {
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
} = require('discord.js');

const { token, rulesChannel } = require('./config.json');

const client = new Client({
    intents: [],
});

client.login(token);

client.once(Events.ClientReady, async (client) => {
    const channel = await client.channels.fetch(rulesChannel);

    const button = new ButtonBuilder()
        .setCustomId('join')
        .setLabel('I agree')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    const message = {
        content:
            "Click the button below if you agree to the rules above and are ready to participate. If nothing happens within a minute and you don't see the other channels, please message one of the Leadership members.",
        components: [row],
    };
    await channel.send(message);

    console.log('message sent.');
    client.destroy();
});
