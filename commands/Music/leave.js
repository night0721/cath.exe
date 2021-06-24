const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "disconnect",
  aliases: ["dc"],
  description: "Leave The Voice Channel",
  category: "Music",
  run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    if (!channel) return client.err(message, "Music", "leave", 35);
    if (!message.guild.me.voice.channel)
      return client.err(message, "Music", "leave", 41);
    try {
      await message.guild.me.voice.channel.leave();
    } catch (error) {
      await message.guild.me.voice.kick(message.guild.me.id);
    }

    const Embed = new MessageEmbed()
      .setAuthor("Left Voice Channel", client.user.displayAvatarURL())
      .setColor("GREEN")
      .setTitle(
        `By user: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("🎶 Left The Voice Channel.")
      .setTimestamp();

    return message.channel.send(Embed);
  },
};
