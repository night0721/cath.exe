module.exports = {
  name: "resume",
  description: "Pauses the current playing music",
  category: "Music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "resume", 34);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "resume", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "resume", 55);
    if (player.paused == false)
      return message.inlineReply("The player is already playing");
    player.pause(false);
    return message.inlineReply("The player is resumed");
  },
};
