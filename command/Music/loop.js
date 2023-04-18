module.exports = {
  name: "loop",
  description: "Music loop",
  category: "Music",
  options: [
    {
      type: 1,
      name: "track",
      description: "Loop the track",
      options: [],
    },
    {
      type: 1,
      name: "queue",
      description: "Loop the whole queue",
      options: [],
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
    if (args[0] === "track") {
      player.setTrackRepeat(player.trackRepeat ? false : true);
      client.se(
        interaction,
        `🔂 \`Music loop is now ${
          player.trackRepeat ? "enabled" : "disabled"
        }\``
      );
    } else {
      player.setQueueRepeat(player.queueRepeat ? false : true);
      client.se(
        interaction,
        `🔂 \`Queue Loop is now ${
          player.trackRepeat ? "enabled" : "disabled"
        }\``
      );
    }
  },
};
