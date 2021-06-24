const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "loop",
  description: "Music loop",
  category: "Music",
  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `🔁  **|**  Loop is ${
            serverQueue.loop === true ? "enabled" : "disabled"
          }`,
        },
      });
    }
    return client.err(message, "Music", "loop", 34);
  },
};
