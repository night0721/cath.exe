const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "status",
  usage: "(Boolean)",
  description: "Maintenance mode",
  category: "Owner",
  Owner: true,
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send("True or False?");
    if (args[0].toLowerCase() === "true") {
      await client.data.maintenance(client.user.id, "true");
      message.channel.send(
        `**${client.user.username}** is under maintenance now`
      );
    } else if (args[0].toLowerCase() === "false") {
      await client.data.maintenance(client.user.id, "false");
      message.channel.send(`**${client.user.username}** back online`);
    } else {
      message.channel.send("True or False?");
    }
  },
};
