module.exports = {
  name: "resume",
  description: "Pauses the current playing music",
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
    if (player.playing) {
      client.err(interaction, "**Music is already resumed!**");
    } else {
      player.pause(false);
      client.se(interaction, "**⏯ Resumed!**");
    }
  },
};
