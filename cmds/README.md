# Command handling

Each command file is an object with `key: value` pairs that get mapped into a
[Collection](https://discord.js.org/#/docs/main/stable/class/Collection). When
adding a new command, make sure to add the following keys:

```js
module.exports = {
    // name of the command
    name: 'string',
    // array of strings for command aliases
    aliases: ['alias1', 'alias2'],
    // description of the command
    description: 'string',
    // category of the command
    // [Team, Car, Meetings/Events, Server Moderation, Purchases, Miscellaneous]
    category: 'string',
    // how the command is used if it uses arguments
    usage: 'string',
    // boolean whether the command needs arguments or not
    args: true,
    // boolean whether the command is an Easter egg or not
    showInHelp: true,
    // boolean whether the command shows up in !help command or not
    easteregg: true,
    execute: async (bot, message, args) => {
        // function to execute prefix command
    },
    interact: async (interaction) => {
        // function to execute slash command
    },
};
```

Document each command with a description and usage:

```js
/**
 * @file [Command description]
 *
 * Prefix command:
 * <prefix>[Command name] {args}    [Description]
 *
 * Slash command:
 * /[Command name] {args}           [Description]
 */
```
