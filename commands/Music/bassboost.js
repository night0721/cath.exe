const levels = {
  0: 0.0,
  1: 0.5,
  2: 1.0,
  3: 2.0,
};

module.exports = {
  name: "bassboost",
  aliases: ["bb", "bassboost"],
  description: "Set filter/bassboost level",
  category: "Music",
  usage: "(Number)",
  Premium: true,
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "bassboost", 34);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "bassboost", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "bassboost", 55);
    let level = "0";
    if (args.length && args[0].toLowerCase() in levels)
      level = args[0].toLowerCase();
    const bands = new Array(3)
      .fill(null)
      .map((_, i) => ({ band: i, gain: levels[level] }));
    player.setEQ(...bands);
    return message.reply(
      `The player's bassboost level has been set to ${level}`
    );
  },
};
