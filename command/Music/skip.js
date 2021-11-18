module.exports = {
  name: "skip",
  description: "Skips to a song in a queue",
  category: "Music",
  options: [
    {
      type: 4,
      name: "position",
      description: "Skips to a specific song in the queue",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const player = await client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel.id;
    if (!channel) {
      client.err(
        interaction,
        "**You must be in a voice channel to use this command.**"
      );
    }
    if (player.voiceChannel !== channel) {
      client.err(
        interaction,
        "**You must be in the same voice channel as me to use this command**"
      );
    }
    if (!player?.queue?.current) {
      client.err(interaction, "**Nothing is playing right now**");
    }
    const skipTo = args[0];
    if (skipTo < 1 || skipTo > player.queue.length) {
      client.err(interaction, "❌ | **Invalid number to skip!**");
    }
    player.stop(skipTo);
    client.se(interaction, `⏭ Skipped \`${Number(skipTo)}\` songs`);
  },
};
