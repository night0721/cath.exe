module.exports = {
  name: "skip",
  aliases: ["sk"],
  description: "Skips the current playing music",
  category: "Music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "skip", 34);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "skip", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "skip", 55);
    if (!player.queue.current) return client.err(message, "Music", "skip", 34);
    const { title } = player.queue.current;
    player.stop();
    return message.inlineReply(`**${title}** was skipped`);
  },
};
