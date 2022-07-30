module.exports = {
  name: "clear-queue",
  description: "Clears the server queue",
  category: "Music",
  run: async (client, interaction, args) => {
    const player = client.manager.get(interaction.guild.id);
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
    player.queue.clear();
    client.se(interaction, "✅ | **Cleared the queue!**");
  },
};
