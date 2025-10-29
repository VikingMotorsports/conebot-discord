const cron = require('node-cron');
const axios = require('axios');

//TODO for Google API token refresh
const CREDENTIALS_PATH = './credentials.json';
const TOKEN_PATH = './token.json';

module.exports = function (bot) {
    cron.schedule('0 9 * * *', async () => {
        // const data = await fs.promises.readFile('./config.json');
        const data = fs.readFileSync('./config.json');
        const competition = new Date(JSON.parse(data).competition);

        if (Date.now() > competition) return;

        const days = Math.ceil((competition.getTime() - Date.now()) / 8.64e7);
        if (days > 60) return;

        console.log(days);

        try {
            bot.channels.cache
                .get(config.announcementsChannel)
                .send(`${days} days until competition.`);
        } catch (error) {
            console.error(error);
        }
    });

    cron.schedule('* * * * *', async () => {
        const pollData = JSON.parse(fs.readFileSync('./polls.json', 'utf-8'));
        for (let i in pollData) {
            if (!pollData.hasOwnProperty(i)) continue;
            const time = pollData[i].time;

            if (Date.now() > time) {
                try {
                    const question = pollData[i].question;
                    const votes = pollData[i].votes;
                    await bot.commands.get('poll').result(bot, question, votes);
                    delete pollData[i];

                    fs.writeFile(
                        './polls.json',
                        JSON.stringify(pollData, null, '\t'),
                        (err) => {
                            if (err) return console.error(err);
                        }
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });

    cron.schedule('0 0 * * 0', async () => {
        const tokenBuffer = await fs.promises.readFile(TOKEN_PATH);
        const tokenContent = JSON.parse(tokenBuffer);
        const refreshToken = tokenContent.refresh_token;
        const currentExpiration = token.expiry_date;

        if (currentExpiration < Date.now()) {
            const credentialsBuffer =
                await fs.promises.readFile(CREDENTIALS_PATH);
            const credentials = JSON.parse(credentialsBuffer);
            const clientID = credentials.installed.client_id;
            const clientSecret = credentials.installed.client_secret;

            try {
                const response = await axios({
                    method: 'post',
                    url: 'https://oauth2.googleapis.com/token',
                    headers: {
                        'Content-Type': 'application-json',
                    },
                    data: {
                        client_id: clientID,
                        client_secret: clientSecret,
                        refresh_token: refreshToken,
                        'grant-type': 'refresh_token',
                    },
                });

                tokenContent['access_token'] = response.data.access_token;
                tokenContent['expiry_date'] =
                    Date.now() + response.data.expires_in * 1000;

                fs.writeFile(
                    TOKEN_PATH,
                    JSON.stringify(tokenContent, null, '\t'),
                    (err) => {
                        if (err) console.error(err);
                        console.log('Google API token refreshed');
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
    });
};
