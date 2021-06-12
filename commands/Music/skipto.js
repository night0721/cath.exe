const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "skipto",
  description: "Skip to the selected queue number",
  usage: "(Number)",
  category: "Music",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args.length || isNaN(args[0]))
      return client.err(message, "Music", "skipto", 101);
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return client.err(message, "Music", "skipto", 37);
    if (args[0] > queue.songs.length)
      return client.err(message, "Music", "skipto", 101);
    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    try {
      queue.connection.dispatcher.end();
    } catch (error) {
      queue.voiceChannel.leave();
      message.client.queue.delete(message.guild.id);
      return client.err(message, "Music", "skipto", 36);
    }

    queue.textChannel
      .send({
        embed: {
          color: "GREEN",
          description: `${message.author} ⏭ skipped ${args[0] - 1} songs`,
        },
      })
      .catch(console.error);
    message.react("✅");
  },
};
