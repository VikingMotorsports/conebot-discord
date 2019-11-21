module.exports = {
    name: 'handbook',
    aliases: ['memberhandbook', 'newmember', 'newb', 'guide', 'standards'],
    description: 'Link to member handbook',
    execute(message, args) {
        message.channel.send('https://docs.google.com/document/d/1L6yibciGTVjXPTFCDR5A2rbHGHXxjalg5Lqm-m4-wxc/edit?usp=sharing');
    }
}