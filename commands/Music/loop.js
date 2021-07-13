module.exports = {
  name: "loop",
  aliases: ["repeat"],
  description: "Music loop",
  category: "Music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "loop", 34);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "loop", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "loop", 55);
    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
      return message.inlineReply(`Queue repeat is ${queueRepeat}`);
    }
    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
    return message.inlineReply(`Queue repeat is ${trackRepeat}`);
  },
};
