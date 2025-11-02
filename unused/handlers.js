/*******************************************************************************
 * Effectively replaced by the join button
 ******************************************************************************/

bot.on(Events.MessageReactionAdd, (reaction, user) => {
    if (!user) return;
    if (user.bot) return;
    if (!reaction.message.channel.guild) return;
    if (
        reaction.emoji.name === '✅' &&
        reaction.message.id === config.reactMsg
    ) {
        const role = reaction.message.guild.roles.cache.find(
            (r) => r.name === 'Member'
        );
        try {
            reaction.message.guild.member(user).roles.add(role);
        } catch (error) {
            console.error(error);
        }
    }
});

bot.on(Events.MessageReactionRemove, (reaction, user) => {
    if (!user) return;
    if (user.bot) return;
    if (!reaction.message.channel.guild) return;
    if (
        reaction.emoji.name === '✅' &&
        reaction.message.id === config.reactMsg
    ) {
        const role = reaction.message.guild.roles.cache.find(
            (r) => r.name === 'Member'
        );
        try {
            reaction.message.guild.member(user).roles.remove(role);
        } catch (error) {
            console.error(error);
        }
    }
});
