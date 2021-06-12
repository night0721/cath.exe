const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "unban",
  description: "Unban an user",
  UserPerm: "BAN_MEMBERS",
  BotPerm: "BAN_MEMBERS",
  usage: "(User)",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!args[0]) return client.err(message, "Moderation", "unban", 1);
      const user = await message.guild.members.unban(args[0]);
      const embed = new MessageEmbed()
        .setTitle("User Unbanned")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", user.tag, true)
        .setFooter(
          message.member.displayName || message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .setTimestamp();
      message.inlineReply(embed);
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "unban", 999);
    }
  },
};
