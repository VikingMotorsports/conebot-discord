/**
 * @file Register slash commands.
 */

const { REST, Routes, ApplicationCommandType } = require('discord.js');
const { token, clientID, guildID } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commandsPayload = [];
const foldersPath = path.join(__dirname, 'cmds');
const directory = fs.readdirSync(foldersPath, { withFileTypes: true });

for (const entry of directory) {
    if (entry.isDirectory()) {
        const commandsPath = path.join(foldersPath, entry.name);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'interact' in command) {
                commandsPayload.push(command.data.toJSON());
            }
        }
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
        fs.writeFileSync(
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
