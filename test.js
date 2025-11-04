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
        //interact: true,
        //help: true,
    };

    const foldersPath = path.join(__dirname, 'cmds');
    const directory = fs.readdirSync(foldersPath, { withFileTypes: true });

    let failed = false;
    for (const entry of directory) {
        if (entry.isDirectory()) {
            const commandsPath = path.join(foldersPath, entry.name);
            const commandFiles = fs
                .readdirSync(commandsPath)
                .filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                for (const field in commandInterface) {
                    if (!(field in command)) {
                        failed = true;
                        console.error(
                            `missing [${field}] ${command.data.name}`
                        );
                    }
                }
            }
        }
    }

    if (failed) {
        throw 'interface test failed';
    }
});
