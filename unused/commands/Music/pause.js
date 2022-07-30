module.exports = {
  name: "pause",
  description: "Pauses the current playing music",
  category: "Music",
  run: async (client, interaction, args) => {
    const player = await client.manager.get(interaction.guild.id);
    const channel = interaction.member.voice.channel.id;
    if (!channel) {
      return client.err(
        interaction,
        "**You must be in a voice channel to use this command.**"
      );
    }
    if (player.voiceChannel !== channel) {
      return client.err(
        interaction,
        "**You must be in the same voice channel as me to use this command**"
      );
    }

    if (!player) client.err(interaction, "**Nothing is playing right now**");
    if (player.paused) {
      client.err(interaction, "Music is already paused");
    } else {
      player.pause(true);
      client.se(interaction, "**⏯ Paused!**");
    }
  },
};
