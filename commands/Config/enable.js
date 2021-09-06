const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "enable",
  UserPerm: "MANAGE_CHANNELS",
  usage: "(Command) {Channel}",
  description: "Enable a command in a server",
  category: "Config",
  run: async (client, message, args) => {
    const type = args[0].toLowerCase();
    const name = args[1].toLowerCase();
    const data = await client.data.getGuild(message.guild.id);
    if (!type) return client.err(message, "Config", "enable", 17);
    if (!name) return client.err(message, "Config", "enable", 17);
    if (type === "command") {
      if (!!client.commands.get(name) === false)
        return client.err(message, "Config", "enable", 404);
      if (data.Commands.includes(name) && !!client.command.get(name) === true) {
        await client.data.enable(message.guild.id, "command", name);
        message.channel.send(`This command is enabled now:\n\n\`${cmd}\``);
      } else return client.err(message, "Config", "enable", 18);
    }
    if (type === "category") {
      const category = fs.readdirSync("./commands");
      const names = category.map(e => e.toLowerCase());
      const i = names.indexOf(name);
      const up = names[i][0].toUpperCase();
      const others = names[i].substring(1);
      if (!names.includes(name))
        return client.err(message, "Config", "enable", 404);
      if (data.Category.includes(`${up}${others}`) && names.includes(name)) {
        await client.data.enable(
          message.guild.id,
          "category",
          `${up}${others}`
        );
        message.reply(`This command is enabled now:\n\n\`${up}${others}\``);
      } else return client.err(message, "Config", "enable", 18);
    }
  },
};
