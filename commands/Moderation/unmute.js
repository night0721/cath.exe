const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "unmute",
  UserPerm: "MANAGE_MESSAGES",
  BotPerm: "MANAGE_ROLES",
  usage: "(User)",
  description: "Unmute an user",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user) return client.err(message, "Moderation", "unmute", 1);
      const role = message.guild.roles.cache.find(r => r.name === "Muted");
      if (!role) {
        try {
          await message.guild.roles.create({
            data: {
              name: "Muted",
              permissions: [],
            },
          });
        } catch (e) {
          console.log(e);
          return client.err(message, "Moderation", "unmute", 999);
        }
      }
      await user.roles.remove(role);
      const embed = new MessageEmbed()
        .setTitle("User Unmuted")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", user.user.tag, true)
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
      return client.err(message, "Moderation", "unmute", 999);
    }
  },
};
