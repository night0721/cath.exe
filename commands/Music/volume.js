module.exports = {
  name: "volume",
  description: "To change the server song queue volume",
  usage: "(Number)",
  aliases: ["vol", "v"],
  category: "Music",
  description: "Set volume level of the music",
  run: async (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return client.err(message, "Music", "volume", 34);
    if (!args.length)
      return message.inlineReply(`The player volume is \`${player.volume}\``);
    const { channel } = message.member.voice;
    if (!channel) return client.err(message, "Music", "volume", 35);
    if (channel.id !== player.voiceChannel)
      return client.err(message, "Music", "volume", 55);
    const volume = Number(args[0]);
    if (!volume || volume < 1 || volume > 100 || isNaN(volume))
      return client.err(message, "Music", "volume", 101);
    player.setVolume(volume);
    return message.inlineReply(
      `The player's volume has been set to \`${volume}\`.`
    );
  },
};
