module.exports = {
  name: "seek",
  description: "seek the current playing music",
  category: "Music",
  usage: "(Number)",
  options: [
    {
      type: 3,
      name: "position",
      description: "Enter a timestamp you want to seek to. Example - 2m 10s",
      required: true,
    },
  ],
  run: async (client, interaction, args, utils) => {
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
    const SeekTo = utils.parseTimestring(args[0]);
    if (SeekTo < 0 || SeekTo >= player.queue.current.duration / 1000) {
      client.err(
        interaction,
        `You may seek from \`0\` - \`${player.queue.current.duration}\`\nExample - 2m 10s`
      );
    }
    if (!player.queue.current.isSeekable) {
      client.err(interaction, "**I'm not able to seek this song**");
    }
    if (!SeekTo) {
      client.err(
        interaction,
        `You may seek from \`0\` - \`${player.queue.current.duration}\`\nExample - 2m 10s`
      );
    }
    player.seek(SeekTo * 1000);
    client.se(
      interaction,
      "✅ | **Successfully moved the song to **",
      `\`${SeekTo}\``
    );
  },
};
