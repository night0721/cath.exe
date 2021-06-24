const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "skip",
  description: "To skip the current music",
  category: "Music",
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return client.err(message, "Music", "skip", 35);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return client.err(message, "Music", "skip", 34);
    if (!serverQueue.connection) return;
    if (!serverQueue.connection.dispatcher) return;
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
        .setDescription(`▶ Skipped the music for ${message.author.username}`)
        .setColor("YELLOW")
        .setTitle("Music has been skipped");
      return message.channel.send(xd).catch(err => console.log(err));
    }

    try {
      serverQueue.connection.dispatcher.end();
    } catch (error) {
      serverQueue.voiceChannel.leave();
      message.client.queue.delete(message.guild.id);
      return client.err(message, "Music", "skip", 36);
    }
    message.react("✅");
  },
};
