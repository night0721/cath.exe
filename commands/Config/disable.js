const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "disable",
  UserPerm: "MANAGE_CHANNELS",
  usage: "(Command/Category) (Name)",
  description: "Disable a command in a server",
  category: "Config",
  run: async (client, message, args) => {
    const type = args[0].toLowerCase();
    if (!type) return client.err(message, "Config", "disable", 17);
    const name = args[1].toLowerCase();
    if (!name) return client.err(message, "Config", "disable", 17);
    const data = await client.data.getGuild(message.guild.id);
    if (!type) return client.err(message, "Config", "disable", 17);
    if (type === "command") {
      if (!!client.commands.get(name) === false)
        return client.err(message, "Config", "disable", 404);
      if (data.Commands.includes(name))
        return client.err(message, "Config", "disable", 18);
      message.channel.send(`This command is disabled now:\n\n\`${name}\``);
      await client.data.disable(message.guild.id, "command", name);
    }
    if (type === "category") {
      const category = fs.readdirSync("./commands");
      const names = category.map(e => e.toLowerCase());
      const i = names.indexOf(name);
      const up = names[i][0].toUpperCase();
      const others = names[i].substring(1);
      if (!names.includes(name))
        return client.err(message, "Config", "disable", 404);
      if (data.Category) {
        if (data.Category.includes(name))
          return client.err(message, "Config", "disable", 18);
      }
      if (names.includes(name)) {
        await client.data.disable(
          message.guild.id,
          "category",
          `${up}${others}`
        );
        message.reply(`This command is disabled now:\n\n\`${up}${others}\``);
      }
    }
  },
};
