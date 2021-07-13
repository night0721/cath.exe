const Levels = require("discord-xp");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  timeout: 5000,
  usage: "Check the leaderboard of a server",
  category: "Economy",
  Level: true,
  run: async (client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
    if (rawLeaderboard.length < 1)
      return client.err(message, "Economy", "lb", 10);
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    );
    const lb = leaderboard.map(
      e =>
        `**${e.position}**. ${e.username}#${e.discriminator} Level: ${
          e.level
        } XP: ${e.xp.toLocaleString()}`
    );
    const embed = new MessageEmbed()
      .setTitle(`**Leaderboard for ${message.guild.name}**`)
      .setDescription(`\n${lb.join("\n")}`)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor(client.color);
    message.inlineReply(embed);
  },
};
