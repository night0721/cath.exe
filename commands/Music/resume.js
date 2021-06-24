const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "resume",
  description: "To resume the paused music",
  aliases: ["continue"],
  category: "Music",

  run: async (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
        .setDescription(`▶ Resumed the music for ${message.author.username}`)
        .setColor("YELLOW")
        .setAuthor(
          "Music has been resumed.",
          "https://i.imgur.com/qHPXWxN.gif"
        );
      return message.channel.send(xd);
    }
    return client.err(message, "Music", "resume", 34);
  },
};
