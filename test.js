/**
 * @file tests.
 */

const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert');

test('command interface test', () => {
    const commandInterface = {
        data: true,
        execute: true,
    };

    const commandFiles = fs
        .readdirSync('./cmds')
        .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const cmd = require(`./cmds/${file}`);
        for (const field in commandInterface) {
            assert(field in cmd);
        }
    }
});
