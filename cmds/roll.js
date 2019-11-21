module.exports = {
    name: 'roll',
    aliases: ['rolldice', 'diceroll', 'dice'],
    description: 'Roll X Y-sided dice',
    args: true,
    execute(message, args) {
        if (args[0].match(/\dd\d/)) {
            let numDice = parseInt(args[0].split('d')[0]);
            let diceType = parseInt(args[0].split('d')[1]);

            // if (diceType != 4 && diceType != 6 && diceType != diceType != 8 && diceType != 10 && diceType != 12 && diceType != 20) {
            //     message.channel.send('That is not a standard die.');
            // } else {
            //     let min = Math.ceil(numDice);
            //     let max = Math.floor(numDice * diceType);
            //     let num = Math.floor(Math.random() * (max - min + 1) + min);
            //     message.channel.send(num);
            // }
            let min = Math.ceil(numDice);
            let max = Math.floor(numDice * diceType);
            let num = Math.floor(Math.random() * (max - min + 1) + min);
            if (num === 69) {
                message.channel.send(`${num}...Nice`);
            } else {
                message.channel.send(num);
            }
        } else {
            if (args[0].match(/d\d/)) {
                let diceType = parseInt(args[0].split('d')[1]);
                // console.log(diceType);
                let num = Math.floor(Math.random() * diceType) + 1;
                message.channel.send(`${num}\nBut please, is it really that hard to follow the syntax?`);

            } else {
                message.channel.send('Please follow the syntax.');
            }
        }
    }
}