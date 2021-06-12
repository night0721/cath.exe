const { readdirSync } = require("fs");
module.exports = client => {
  readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        client.commands.set(pull.name, pull);
      } else {
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });
  readdirSync("./cat/").forEach(dir => {
    const commands = readdirSync(`./cat/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../cat/${dir}/${file}`);
      if (pull.name) {
        client.hide.set(pull.name, pull);
      } else {
        continue;
      }
    }
  });
  readdirSync("./events/").forEach(file => {
    const events = readdirSync("./events/").filter(file =>
      file.endsWith(".js")
    );
    for (let file of events) {
      let pull = require(`../events/${file}`);
      if (pull) {
        client.events.set(file, file);
      } else {
        continue;
      }
    }
  });
};
