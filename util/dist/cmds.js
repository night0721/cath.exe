const { readdirSync } = require("fs");
const utils = require("../../util/functions/function");
function cmds() {
  let categories = [];
  readdirSync("./commands").forEach(dir => {
    const dirs = readdirSync(`./commands/${dir}`).filter(file =>
      file.endsWith(".js")
    );
    let commands = [];
    dirs.map(cmd => {
      const file = require(`../../commands/${dir}/${cmd}`);
      commands.push({
        name: file.name ? file.name : "No command name",
        description: file.description
          ? file.description
          : "No command description",
        aliases: file.aliases ? file.aliases : "No command aliases",
        usage: file.usage ? `C.${file.name} ${file.usage}` : `C.${file.name}`,
        timeout: file.timeout
          ? utils.ms(file.timeout, { long: true })
          : "No command cooldown",
        BotPermission: file.BotPerm
          ? file.BotPerm
          : "No required bot permission",
        UserPermission: file.UserPerm
          ? file.UserPerm
          : "No required user permission",
        status: file.status ? file.status : true,
      });
    });
    let data = {
      name: dir,
      commands,
    };
    categories.push(data);
  });
  return categories;
}
module.exports = { cmds };
