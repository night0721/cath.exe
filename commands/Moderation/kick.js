const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kick an user",
  UserPerm: "KICK_MEMBERS",
  BotPem: "KICK_MEMBERS",
  usage: "(User) {Reason}",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ") || "No reason provided";
    if (!target) {
      return client.err(message, "Moderation", "kick", 1);
    } else {
      if (target.id === message.author.id)
        return client.err(message, "Moderation", "kick", 2);
      if (message.member.roles.highest.position < target.roles.highest.position)
        return client.err(message, "Moderation", "kick", 8);
      if (
        message.guild.me.roles.highest.position < target.roles.highest.position
      )
        return client.err(message, "Moderation", "kick", 9);
    }
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
    try {
      const embed = new MessageEmbed()
        .setTitle("User Kicked")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", target.user.tag, true)
        .addField("**Reason**", reason, true)
        .setFooter(
          message.member.displayName || message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .setTimestamp();
      message.inlineReply(embed);
      await target.kick(reason);
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "kick", 999);
    }
  },
};
