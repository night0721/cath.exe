module.exports = {
  name: "remove",
  description: "Remove a song from the queue",
  category: "Music",
  options: [
    {
      type: 4,
      name: "track",
      description: "Remove a song from the queue",
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
    if (!player) client.err(interaction, "**Nothing is playing right now**");
    if (args[0] > player.queue.length) {
      client.err(
        interaction,
        `The queue has only **${player?.queue.length}** songs`
      );
    } else {
      client.se(
        interaction,
        `✅ | **Removed track** \`${parseInt(args[0])}\` from the queue!`
      );
      player.queue.remove(parseInt(args[0]) - 1);
    }
  },
};
