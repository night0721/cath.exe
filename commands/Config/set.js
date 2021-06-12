const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "set",
  description: "Set Goodbye/Welcome/Log Channel for the server",
  usage: "(goodbye/welcome/log) (#Channel)",
  UserPerm: "ADMINISTRATOR",
  category: "Config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) return client.err(message, "Config", "set", 45);
    if (args[0].toLowerCase() === "goodbye") {
      const channel = message.mentions.channels.first();
      if (!channel) return client.err(message, "Config", "set", 28);
      await client.data.setGoodbye(message.guild.id, channel.id);
      message.channel.send(`Saved ${channel} as the goodbye channel.`);
    } else if (args[0].toLowerCase() === "log") {
      const channel = message.mentions.channels.first();
      if (!channel) return client.err(message, "Config", "set", 28);
      await client.data.setLog(message.guild.id, channel.id);
      message.channel.send(`Saved ${channel} as the log channel.`);
    } else if (args[0].toLowerCase() === "welcome") {
      const channel = message.mentions.channels.first();
      if (!channel) return client.err(message, "Config", "set", 28);
      await client.data.setWelcome(message.guild.id, channel.id);
      message.channel.send(`Saved ${channel} as the welcome channel.`);
    } else {
      return client.err(message, "Config", "set", 45);
    }
  },
};
