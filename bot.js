const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    codeBlock,
    ChannelType,
    Events,
    ActivityType,
    MessageFlags,
    Routes,
} = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
    ],
    allowedMentions: {
        parse: ['roles', 'everyone', 'users'],
        repliedUser: true,
    },
});

const requiredFiles = [
    'config.json',
    'emails.json',
    'phones.json',
    'links.json',
];

// Check for required files on startup
(async () => {
    await checkRequiredFiles();
})();
// Register cronjobs
require('./cron.js')(bot);

bot.commands = new Collection(); // Stores full command objects
const slashCommandsToRegister = []; // Array to hold JSON data for slash commands

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

        // All new/refactored commands must have data, executePrefix, and executeSlash
        if (command.data && command.executeSlash) {
            bot.commands.set(command.data.name, command);
            slashCommandsToRegister.push(command.data.toJSON());
        } else {
            console.warn(
                `[WARNING] The command at ${filePath} is missing required 'data' or 'executeSlash' properties and will not be loaded.`
            );
        }
    }
}

// Function to register slash commands with Discord API
async function registerSlashCommands(client) {
    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        console.log(
            `Started refreshing ${slashCommandsToRegister.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands with the current set
        const data = await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: slashCommandsToRegister }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Error refreshing application (/) commands:', error);
    }
}

bot.login(config.token);

bot.once(Events.ClientReady, async (client) => {
    console.log(`Bot online as ${client.user.tag} in ${client.guilds.cache.first()}`);
    client.user.setActivity('your every move', {
        type: ActivityType.Watching,
    });

    console.assert(
        client.channels.cache.get(config.rulesChannel) !== undefined,
        'rules channel not set'
    );

    // Register slash commands once the bot is ready.
    // For production, this is better done in a separate deploy script.
    await registerSlashCommands(client);
});

bot.on(Events.MessageCreate, async (message) => {
    const replies = require('./messageReplies');

    if (message.author.bot || message.channel.type === ChannelType.DM)
        return;

    // Handle prefix commands
    if (message.content.startsWith(config.prefix)) {
        if (message.content.includes('`')) return; // Ignore messages with code blocks

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        if (!args.length) return;
        const commandName = args.shift().toLowerCase();

        const command =
            bot.commands.get(commandName) ??
            bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (!command.executePrefix) {
            // Optionally inform user this is a slash-only command
            return;
        }

        try {
            await command.executePrefix(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error executing that command.');
        }
    } else {
        // Handle message-based replies for non-commands
        replies(bot, message);
    }
});

bot.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
        await handleCommandInteraction(interaction);
    } else if (interaction.isButton() && interaction.customId === 'join') {
        await joinButtonHandler(interaction);
    }
});

async function handleCommandInteraction(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        await interaction.reply({ content: 'Error: Command not found.', ephemeral: true });
        return;
    }

    try {
        await command.executeSlash(interaction);
    } catch (error) {
        console.error(`Error executing '${interaction.commandName}':`, error);
        const errorMessage = { content: 'There was an error while executing this command!', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
}

async function checkRequiredFiles() {
    for (const f of requiredFiles) {
        try {
            await fs.promises.access(`./${f}`, fs.constants.F_OK);
            console.log(`${f} exists`);
        } catch (error) {
            fs.writeFile(`./${f}`, JSON.stringify({}), (err) => {
                if (err) console.error(err);
            });
            console.log(`${f} created`);
        }
    }
}

// Placeholder for button handler logic
async function joinButtonHandler(interaction) {
    // Implementation for the join button would go here
    console.log(`'join' button clicked by ${interaction.user.tag}`);
    await interaction.reply({ content: 'Button interaction received!', ephemeral: true });
}