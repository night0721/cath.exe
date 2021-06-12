const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "check",
  description: "Check Goodbye/Welcome/Log Channel for the server",
  usage: "(goodbye/welcome/log) (Channel)",
  UserPerm: "ADMINISTRATOR",
  category: "Config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const data = await client.data.getGuild(message.guild.id);
    if (!args[0]) return client.err(messgae, "Config", "check", 45);
    if (args[0].toLowerCase() === "goodbye") {
      const goodbye = data.Goodbye;
      if (goodbye === "null") return client.err(messgae, "Config", "check", 10);
      else message.channel.send(`The goodbye channel is <#${goodbye}>`);
    } else if (args[0].toLowerCase() === "log") {
      const log = data.Log;
      if (log === "null") return client.err(messgae, "Config", "check", 10);
      else message.channel.send(`The log channel is <#${log}>`);
    } else if (args[0].toLowerCase() === "welcome") {
      const welcome = data.Welcome;
      if (welcome === "null") return client.err(messgae, "Config", "check", 10);
      else message.channel.send(`The welcome channel is <#${welcome}>`);
    } else {
      return client.err(messgae, "Config", "check", 45);
    }
  },
};
