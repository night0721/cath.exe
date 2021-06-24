const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  usage: "(Number)",
  aliases: ["rm"],
  category: "Music",
  run: async (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return client.err(message, "Music", "remove", 37);
    if (!args.length) return client.err(message, "Music", "remove", 101);
    if (isNaN(args[0])) return client.err(message, "Music", "remove", 7);
    if (queue.songs.length == 1)
      return client.err(message, "Music", "remove", 37);
    if (args[0] > queue.songs.length)
      return client.err(message, "Music", "remove", 101);
    try {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`❌ **|** Removed: **${song[0].title}** from the queue`)
        .setTimestamp(`Made by ${client.author}`);
      const song = queue.songs.splice(args[0] - 1, 1);
      message.inlineReply(embed);
      message.react("✅");
    } catch (e) {
      console.log(e);
      return client.err(message, "Music", "remove", 999);
    }
  },
};
