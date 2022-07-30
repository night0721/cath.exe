module.exports = {
  name: "shuffle",
  description: "Music shuffle",
  category: "Music",
  run: async (client, interaction) => {
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
    if (!player.queue || !player.queue.length || player.queue.length === 0) {
      client.err(interaction, "**Not enough songs in the queue to shuffle**");
    }
    player.queue.shuffle();
    client.se(interaction, "✅ | Shuffled the queue");
  },
};
