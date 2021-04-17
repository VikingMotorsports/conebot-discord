# Cone Bot for Discord

Functionally identical to [Orange Cone](https://github.com/gearysw/orangecone), adapted for use in Discord. Uses the [Discord.js](https://discord.js.org/#/) library.

This bot requires a `config.json` file in the root directory to load environment variables. The variables used are:
- `token`: Discord bot token to login to
- `prefix`: String to prepend to a command for the bot to handle commands
- `guildID`: ID of the server that this bot will be used in
- `rulesChannel`: The Rules or Welcome channel that contains the message where bot will monitor for reactions
- `announcementsChannel`: Announcements channel where bot will ignore any commands
- `reactMsg`: ID of the message in the Rules or Welcome channel where bot will monitor for reactions
- `pollsChannel`: ID of the channel where polls and their results will be sent
- `spreadsheetID`: Google Sheets ID that this instance of bot uses to read order statuses

Other files to create before using the bot:
- `emails.json` - fill with empty object {null}
- `phones.json` - fill with empty object {null}
- `polls.json` - fill with empty object {null}
- `soda.json` - fill with empty array [null]
- `links.json` - fill with the following key-value pair:
    - `affiliate`: link to document for affiliating with a school on sae.org
    - `calendar`: link to team calendar
    - `car`: link to current documentation directory of the car
    - `checkin`: link to check in form
    - `designlog`: link to design log
    - `drive`: link to the team's Google Drive folder
    - `gantt`: link to the gantt chart
    - `handbook`: link to the latest revision of the Member Handbook
    - `minutes`: link to the folder of meeting minutes
    - `msds`: link to the folder containing MSDS documents
    - `order`: link to the ordering form
    - `purchases`: link to member facing purchasing spreadsheet
    - `library`: link to the team's library
    - `roster`: link to the team roster
    - `rules`: link to the latest FSAE rulebook
    - `website`: link to the team's website

test
