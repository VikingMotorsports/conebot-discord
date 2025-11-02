// Discord added a poll feature
async function pollSelectMenuHandler(interaction) {
    const option = interaction.values;
    const messageId = interaction.message.id;
    const user = interaction.user.id;
    try {
        const reply = await bot.commands
            .get('poll')
            .cast(messageId, option, user);
        interaction.reply(reply);
    } catch (error) {
        console.error(error);
        if (!interaction.replied)
            await interaction.reply({
                content: `Error executing command:\n${codeBlock('js', error)}`,
                flags: MessageFlags.Ephemeral,
            });
    }
}

// Replaced by command
// Might still be useful for testing
async function createInvite(client) {
    try {
        const invite = await client.generateInvite([
            'ADD_REACTIONS',
            'SEND_MESSAGES',
            'VIEW_CHANNEL',
            'EMBED_LINKS',
            'ATTACH_FILES',
            'READ_MESSAGE_HISTORY',
            'CONNECT',
            'SPEAK',
            'CHANGE_NICKNAME',
            'MANAGE_ROLES',
            'MANAGE_EMOJIS',
        ]);
        console.log(invite);
    } catch (error) {
        console.log(error);
    }
    const reactMessage = await bot.channels.cache
        .get(config.rulesChannel)
        .messages.fetch(config.reactMsg); // caches reaction message
    reactMessage.react('✅');
    await setCommandPermissions();
}

// Never called
async function setCommandPermissions() {
    bot.application.fetch();
    const index = commandCache.map((c) => c.name).indexOf('update');
    if (index === -1) return;
    const updateCommand = await bot.guilds.cache
        .get(config.guildID)
        .commands.fetch(commandCache[index].id);
    const permissions = [
        {
            id: config.leadershipRoleId,
            type: 'ROLE',
            permission: true,
        },
    ];
    await updateCommand.permissions.add({ permissions });
}

async function testCommand() {
    const data = fs.readFileSync('./config.json');
    const competition = new Date(JSON.parse(data).competition);

    if (Date.now() > competition) return;

    const days = Math.ceil((competition.getTime() - Date.now()) / 8.64e7);
    if (days > 60) return;

    // console.log(days);

    try {
        bot.channels.cache
            .get('644810281611952130')
            .send(
                `competition: ${competition}\ndate now: ${Date.now()}\n${days} days until competition.`
            );
    } catch (error) {
        console.error(error);
    }
}
