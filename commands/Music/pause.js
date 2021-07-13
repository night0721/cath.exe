module.exports = {
  name: "pause",
  aliases: ["ps"],
  description: "Pauses the current playing music",
  category: "Music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "pause", 34);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "pause", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "pause", 55);
    if (player.paused)
      return message.inlineReply("The player is already paused");
    player.pause(true);
    return message.inlineReply("The player is paused");
  },
};
