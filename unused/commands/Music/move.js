module.exports = {
  name: "move",
  description: "Moves a track to a specified position",
  options: [
    {
      type: 4,
      name: "track",
      description: "Track to move.",
      required: true,
    },
    {
      type: 4,
      name: "position",
      description: "Moves selected track to the specified position.",
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
    const trackNum = args[0] - 1;
    const dest = args[1] - 1;
    if (trackNum < 0 || trackNum > player.queue.length - 1) {
      client.err(interaction, "**Invalid track number**");
    } else if (dest < 0 || dest > player.queue.length - 1) {
      client.err(interaction, "**Invalid track destination**");
    } else {
      const track = player.queue[trackNum];
      player.queue.splice(trackNum, 1);
      player.queue.splice(dest, 0, track);
      client.se(
        interaction,
        `✅ | **${track.title}** has been moved to position ${dest + 1}`
      );
    }
  },
};
