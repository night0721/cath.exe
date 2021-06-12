const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "shuffle",
  description: "Shuffle queue",
  category: "Music",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return client.err(message, "Music", "shuffle", 37);
    try {
      let songs = serverQueue.songs;
      for (let i = songs.length - 1; i > 1; i--) {
        let j = 1 + Math.floor(Math.random() * i);
        [songs[i], songs[j]] = [songs[j], songs[i]];
      }
      serverQueue.songs = songs;
      message.client.queue.set(message.guild.id, serverQueue);
      message.react("✅");
    } catch (error) {
      message.guild.me.voice.channel.leave();
      message.client.queue.delete(message.guild.id);
      return client.err(message, "Music", "shuffle", 36);
    }
  },
};
