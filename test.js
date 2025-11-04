/**
 * @file tests.
 */

const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert');

test('command interface test', () => {
    const commandInterface = {
        data: true,
        execute: true,
        interact: true,
        //help: true,
    };

    const foldersPath = path.join(__dirname, 'cmds');
    const commandFolders = fs
        .readdirSync(foldersPath)
        .filter((file) => file !== 'README.md');

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            for (const field in commandInterface) {
                try {
                    assert(field in command);
                } catch (_) {
                    console.error(`missing [${field}] ${command.data.name}`);
                }
            }
        }
    }
});
