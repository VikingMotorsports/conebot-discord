module.exports = async function (bot, message) {
    if (message.content.toLowerCase().includes('hello')) {
        const blobwave = await findEmoji('blobwave');
        message.channel.send(`Hi! ${blobwave}`);
    }
    if (
        message.content
            .toLowerCase()
            .includes('sticky liquid' || 'sticky juice')
    ) {
        message.react('💦');
    }
    if (
        message.author.id === '216771586651455492' &&
        (message.content.toLowerCase().includes('vodka') ||
            message.content.toLowerCase().includes('russian water') ||
            message.content.toLowerCase().includes('slav') ||
            message.content.toLowerCase().includes('whiskey'))
    ) {
        const blyat = await findEmoji('blyat');
        message.react(blyat);
    }
    if (
        message.content.toLowerCase().includes('good night') ||
        message.content.toLowerCase().includes('gnight') ||
        message.content.toLowerCase().includes('good morning') ||
        message.content.toLowerCase().includes('good afternoon')
    ) {
        try {
            const reply = await bot.commands
                .get('greeting')
                .execute(bot, message, args);
            message.channel.send(reply);
        } catch (error) {
            console.error(error);
        }
    }
    if (message.content.toLowerCase().includes('heads or tails')) {
        try {
            const reply = await bot.commands
                .get('cointoss')
                .execute(bot, message, args);
            message.channel.send(reply);
        } catch (error) {
            console.error(error);
        }
    }
    if (message.content.toLowerCase().includes('blyat')) {
        const blyat = await findEmoji('blyat');
        message.react(blyat);
    }
    if (message.content.toLowerCase().includes('good bot')) {
        message.react('🤗');
        message.channel.send(
            `Thank you, ${message.member.nickname || message.author.username}!`
        );
    }
    if (
        message.content.toLowerCase().includes('bad bot') ||
        message.content.toLowerCase().includes('fuck you bot') ||
        message.content.toLowerCase().includes('fuck you, bot')
    ) {
        message.react('🖕');
        let diss = ['no u 😠', '😤', 'fite me', '😢'];
        let saydiss = diss[Math.floor(Math.random() * diss.length)];
        message.channel.send(saydiss);
    }
    if (
        message.content.toLowerCase().includes('cone') &&
        (message.content.toLowerCase().includes('avoid') ||
            message.content.toLowerCase().includes('mind') ||
            message.content.toLowerCase().includes('watch out'))
    ) {
        const cone = await findEmoji('cone');
        message.react(cone);
    }
    if (
        message.content.toLowerCase().includes('ducttape') ||
        message.content.toLowerCase().includes('duct tape')
    ) {
        const ducttape = await findEmoji('ducttape');
        message.react(ducttape);
    }
    if (message.content.toLowerCase().match(/ye{2,}t/)) {
        const yeet = await findEmoji('yeet');
        message.react(yeet);
    }
    if (
        message.content.toLowerCase().includes('send it') ||
        message.content.toLowerCase().includes('sent it')
    ) {
        const send = await findEmoji('sendit');
        message.react(send);
    }
    if (message.content.toLowerCase().includes('euro')) {
        message.react('🇪🇺');
    }
    if (message.content.toLowerCase().includes('doubt')) {
        const doubt = await findEmoji('doubt');
        message.react(doubt);
    }
    if (
        message.author.id === '216771586651455492' &&
        message.content.toLowerCase().includes('user error')
    ) {
        message.channel.send(
            'https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif'
        );
    }
    if (message.content.toLowerCase().includes('unbelievable')) {
        message.channel.send('http://gfycat.com/MadUnfinishedDarklingbeetle');
    }
    if (message.content.toLowerCase().includes('sentient')) {
        message.react('👀');
        message.channel.send(
            'https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy.gif'
        );
    }
    if (message.content.toLowerCase().includes('shoey')) {
        message.channel.send(
            'https://tenor.com/view/daniel-ricciardo-honey-badger-dr3-shoey-f1-gif-12688182'
        );
    }
    if (
        message.content.toLowerCase().includes(' ass ') &&
        (message.content.toLowerCase().includes('wrc') ||
            message.content.toLowerCase().includes('rally') ||
            message.content.toLowerCase().includes('timo'))
    ) {
        message.channel.send('https://youtu.be/JleS4BdTGlo?t=17');
    }
    if (message.content.toLowerCase().includes('!salty')) {
        message.channel.send('https://streamable.com/6t08o');
    }
    if (
        message.content.toLowerCase().includes('they had us') ||
        message.content.toLowerCase().includes('first half')
    ) {
        message.channel.send('https://i.imgur.com/QpnBp7G.jpg');
    }
    if (
        message.content.toLowerCase().includes('shitshow') ||
        message.content.toLowerCase().includes('shit show')
    ) {
        message.channel.send('https://streamable.com/dvvsd5');
    }
    if (message.content.toLowerCase().includes('fucking idiot')) {
        message.channel.send('https://www.youtube.com/watch?v=stb0sqtwAZA');
    }
    if (
        message.content.toLowerCase().includes('monza') ||
        message.content.toLowerCase().includes('orgasm')
    ) {
        message.channel.send('https://www.youtube.com/watch?v=DJ1EZOvLJcI');
    }
    if (message.content.toLowerCase().includes('how cute')) {
        message.channel.send('https://i.imgur.com/Dvi8rwG.jpg');
    }
    if (
        message.content.toLowerCase().includes('oh deer') ||
        message.content.toLowerCase().includes('oh dear')
    ) {
        message.channel.send('https://www.youtube.com/watch?v=VaU6pqhwur4');
    }
    if (
        message.content
            .toLowerCase()
            .includes("can't believe you've done this") ||
        message.content
            .toLowerCase()
            .includes('cant believe youve done this') ||
        message.content.toLowerCase().includes("can't believe it") ||
        message.content.toLowerCase().includes('cant believe it')
    ) {
        message.channel.send('https://youtu.be/O7lRV1VHv1g?t=3');
    }
};
