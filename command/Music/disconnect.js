module.exports = {
  name: "disconnect",
  description: "To stop the music and clear the queue",
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
    player.destroy();
    client.se(interaction, "🎶| **Disconnected!**");
  },
};
