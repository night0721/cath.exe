module.exports = {
  name: "volume",
  description: "To change the server song queue volume",
  category: "Music",
  description: "Set volume level of the music",
  options: [
    {
      type: 4,
      name: "volume",
      description: "The volume of the player. Default is 100",
      required: true,
    },
  ],
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
    const vol = parseInt(args[0]);
    player.setVolume(vol);
    client.se(
      interaction,
      `🔉 | The player's volume has been set to \`${player.volume}\``
    );
  },
};
