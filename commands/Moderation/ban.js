const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  description: "Ban an user",
  BotPerm: "BAN_MEMBERS",
  UserPerm: "BAN_MEMBERS",
  usage: "(User) {Reason}",
  category: "Moderation",
  run: async (client, message, args) => {
    let target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ") || "No reason provided";
    if (!target) {
      try {
        const one = await client.users.fetch(args[0]);
        if (one.id === message.author.id)
          return client.err(message, "Moderation", "ban", 2);
        if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
        const embed = new MessageEmbed()
          .setTitle("User Banned")
          .addField("**Moderator**", message.author.tag, true)
          .addField("**User**", one.tag, true)
          .addField("**Reason**", reason, true)
          .setFooter(
            message.member.displayName || message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(client.color)
          .setTimestamp();
        message.inlineReply(embed);
        await message.guild.members.ban(one.id, {
          reason: reason,
        });
      } catch (e) {
        console.log(e);
        return client.err(message, "Moderation", "ban", 1);
      }
    } else {
      if (target.id === message.author.id)
        return client.err(message, "Moderation", "ban", 2);
      if (message.member.roles.highest.position < target.roles.highest.position)
        return client.err(message, "Moderation", "ban", 8);
      if (
        message.guild.me.roles.highest.position < target.roles.highest.position
      )
        return client.err(message, "Moderation", "ban", 9);

      if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
      try {
        const embed = new MessageEmbed()
          .setTitle("User Banned")
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
        await message.guild.members.ban(target.id, {
          reason: reason,
        });
      } catch (e) {
        console.log(e);
        return client.err(message, "Moderation", "ban", 999);
      }
    }
  },
};
