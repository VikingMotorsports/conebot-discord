# Cone Bot for Discord

Functionally identical to [Orange Cone](https://github.com/gearysw/orangecone),
adapted for use in Discord. Uses the [Discord.js](https://discord.js.org/#/) library.

## Configuration files 

### `config.json` stores various bot parameters:

- `token`: Bot token secret;
- `prefix`: Command prefix;
- `clientID`: ID of the bot;
- `guildID`: ID of the server;
- `rulesChannel`: Landing page for invites;
- `announcementsChannel`: Where bot will ignore any commands;

> [!Note]
> Minimum required parameters: `token`, `prefix`, `cliendID`, `guildID`.

### Other files to create before using the bot:

- `emails.json` - fill with empty object {null}
- `phones.json` - fill with empty object {null}
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
    - `rulesFSAE`: link to the latest Formula SAE rulebook
    - `rulesBAJASAE`: link to the latest BAJA SAE rulebook
    - `onshape`: link to sign up for an OnShape education account.
    - `website`: link to the team's website

> [!Note]
> These additional files are only required if testing `email`, `phone`, or `link-related` commands.

## Contributing

Read [CONTRIBUTING.md][Contributing].

## License

This project is licensed under the [MIT License][License].

[License]: ./LICENSE
[Contributing]: ./CONTRIBUTING.md
