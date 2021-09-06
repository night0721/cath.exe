module.exports = {
  name: "stop",
  aliases: ["dc"],
  description: "To stop the music and clear the queue",
  category: "Music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "stop", 34);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "stop", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "stop", 55);
    player.destroy();
    message.react("✅");
    return message.reply("The player has been destroyed");
  },
};
