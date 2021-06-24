const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "pause",
  description: "To pause the current music in the server",
  category: "Music",
  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      try {
        serverQueue.connection.dispatcher.pause();
      } catch (error) {
        message.client.queue.delete(message.guild.id);
        return client.err(message, "Music", "pause", 36);
      }
      let xd = new MessageEmbed()
        .setDescription(`⏸ Paused the music for ${message.author.username}`)
        .setColor("YELLOW")
        .setTitle("Music has been paused.");
      return message.channel.send(xd);
    }
    return client.err(message, "Music", "pause", 34);
  },
};
