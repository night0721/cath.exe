const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "stop",
  description: "To stop the music and clear the queue",
  category: "Music",
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return client.err(message, "Music", "stop", 35);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return client.err(message, "Music", "stop", 34);
    if (!serverQueue.connection) return;
    if (!serverQueue.connection.dispatcher) return;
    try {
      serverQueue.connection.dispatcher.end();
    } catch (error) {
      message.guild.me.voice.channel.leave();
      message.client.queue.delete(message.guild.id);
      return client.err(message, "Music", "stop", 36);
    }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅");
  },
};
