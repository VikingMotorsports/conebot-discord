/**
 * @file Register slash commands.
 */

const { REST, Routes, ApplicationCommandType } = require('discord.js');
const { token, clientID, guildID } = require('./config.json');
const { writeFile, readdirSync } = require('node:fs');

const commandsPayload = [];
const commandFiles = readdirSync('./cmds').filter((file) =>
    file.endsWith('.js')
);

for (const f of commandFiles) {
    const command = require(`./cmds/${f}`);
    if (command.data.name === 'update') {
        const data = command.data.toJSON();
        data['default_permission'] = false;
        commandsPayload.push(data);
        continue;
    }
    if (command.isSlashCommand) {
        commandsPayload.push(command.data.toJSON());
    }
}

const emailContextMenu = {
    name: 'Get Email Address',
    type: ApplicationCommandType.User,
};
const phoneContextMenu = {
    name: 'Get Phone Number',
    type: ApplicationCommandType.User,
};

commandsPayload.push(emailContextMenu, phoneContextMenu);

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log('Registering slash commands...');

        const res = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commandsPayload }
        );
        writeFile(
            './slashCommands.json',
            JSON.stringify(res, null, '\t'),
            (err) => {
                if (err) console.error(err);
            }
        );

        console.log(
            `Slash commands registered: ${res.map((c) => c.name).join(', ')}`
        );
    } catch (error) {
        console.error(error);
    }
})();
