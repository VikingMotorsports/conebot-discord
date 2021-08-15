const { token, clientID, guildID } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { writeFile } = require('fs');
// const { SlashCommandBuilder } = require('@discordjs/builders');

const slashCommands = ['help', 'bonk', 'checkin', 'cointoss', 'drive', 'email', 'face', 'inventory', 'invite', 'license', 'order', 'pdm', 'phone', 'po', 'poll', 'role', 'roll', 'socialmedia', 'soda', 'stash', 'tutorials', 'update', 'waiver'];
// const linkCommands = ['affiliate', 'calendar', 'car', 'designlog', 'gannt', 'handbook', 'inventory', 'library', 'minutes', 'msds', 'purchases', 'roster', 'rules'];
// const linkCommand = 

const commandsPayload = [];

for (const f of slashCommands) {
    const command = require(`./cmds/${f}.js`);
    commandsPayload.push(command.data);
}
const linksCommand = require('./cmds/links.js');
commandsPayload.push(linksCommand.data.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Registering slash commands...');

        const res = await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commandsPayload });
        writeFile('./slashCommands.json', JSON.stringify(res, null, '\t'), err => { if (err) console.error(err) });

        console.log(`Slash commands registered: ${res.map(c => c.name).join(', ')}`);
    } catch (error) {
        console.error(error);
    }
})();

// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });