const fs = require("fs");
const cmds = [];
const ownercmds = [];
module.exports = async client => {
  fs.readdirSync("./events").forEach(file => {
    require(`${process.cwd()}/events/${file}`);
  });
  fs.readdirSync("./command").forEach(directory => {
    if (directory !== "Owner") {
      const commands = fs.readdirSync(`./command/${directory}/`);
      commands.map(value => {
        const file = require(`${process.cwd()}/command/${directory}/${value}`);
        if (file.name) {
          const properties = { directory, ...file };
          client.slashCommands.set(file.name, properties);
        }
        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if (file.UserPerms) file.defaultPermission = false;
        cmds.push(file);
      });
    }
  });
  fs.readdirSync("./command/Owner").forEach(f => {
    const file = require(`${process.cwd()}/command/Owner/${f}`);
    client.hide.set(file.name, file);
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    if (file.UserPerms) file.defaultPermission = false;
    ownercmds.push(file);
  });
  client.on("ready", async () => {
    await client.guilds.cache.get("840225563193114624").commands.set(ownercmds);
    await client.application.commands.set(cmds);
  });
};
