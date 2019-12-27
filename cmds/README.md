# Command handling

Each command file is an object with `key: value` pairs that get mapped into a [Collection](https://discord.js.org/#/docs/main/stable/class/Collection). When adding a new command, make sure to add the following keys:

```js
{
    name: 'string', // name of the command
    aliases: ['alias1', 'alias2'], // array of strings for command aliases
    description: 'string', // description of the command
    args: true // boolean whether the command needs arguments or not
    usage: 'string', // how the command is used if it uses arguments
    easteregg: true, // boolean whether the command is an Easter egg or not
    execute: async (bot, message, args) {
        // function to execute when the command is called
    }
}
```
