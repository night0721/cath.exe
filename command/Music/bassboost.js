const levels = {
  none: 0.0,
  low: 0.2,
  medium: 0.3,
  high: 0.35,
};
module.exports = {
  name: "bassboost",
  description: "Set filter/bassboost level",
  category: "Music",
  usage: "(Number)",
  Premium: true,
  options: [
    {
      type: 3,
      name: "level",
      description: `Please provide a bassboost level`,
      required: true,
      choices: [
        { name: "low", value: "low" },
        { name: "medium", value: "medium" },
        { name: "high", value: "high" },
        { name: "none", value: "none" },
      ],
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
    player.setEQ(
      ...new Array(3)
        .fill(null)
        .map((_, i) => ({ band: i, gain: levels[args[0]] }))
    );
    client.se(
      interaction,
      `✅ | **Set the bassboost level to** \`${args[0]}\``
    );
  },
};
