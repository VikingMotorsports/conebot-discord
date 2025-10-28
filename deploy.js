const { token, clientID, guildID } = require("./config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { writeFile, readdirSync } = require("fs");
// const { SlashCommandBuilder } = require('@discordjs/builders');

// const slashCommands = ['help', 'bonk', 'checkin', 'cointoss', 'drive', 'email', 'inventory', 'invite', 'license', 'order', 'pdm', 'phone', 'poll', 'role', 'roll', 'socialmedia', 'soda', 'stash', 'tutorials', 'update', 'waiver'];
const commandsPayload = [];
const commandFiles = readdirSync("./cmds").filter((file) =>
  file.endsWith(".js"),
);

// for (const f of slashCommands) {
//     const command = require(`./cmds/${f}.js`);
//     if (f === 'update') {
//         const data = command.data.toJSON();
//         data['default_permission'] = false;
//         commandsPayload.push(data);
//         continue;
//     }
//     commandsPayload.push(command.data.toJSON());
// }
// const linksCommand = require('./cmds/links.js');

for (const f of commandFiles) {
  const command = require(`./cmds/${f}`);
  if (command.data.name === "update") {
    const data = command.data.toJSON();
    data["default_permission"] = false;
    commandsPayload.push(data);
    continue;
  }
  if (command.isSlashCommand) commandsPayload.push(command.data.toJSON());
}
// commandsPayload.push(linksCommand.data.toJSON());
const emailContextMenu = {
  name: "Get Email Address",
  type: 2,
};
const phoneContextMenu = {
  name: "Get Phone Number",
  type: 2,
};
commandsPayload.push(emailContextMenu, phoneContextMenu);

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Registering slash commands...");

    const res = await rest.put(
      Routes.applicationGuildCommands(clientID, guildID),
      { body: commandsPayload },
    );
    writeFile(
      "./slashCommands.json",
      JSON.stringify(res, null, "\t"),
      (err) => {
        if (err) console.error(err);
      },
    );

    console.log(
      `Slash commands registered: ${res.map((c) => c.name).join(", ")}`,
    );
  } catch (error) {
    console.error(error);
  }
})();
