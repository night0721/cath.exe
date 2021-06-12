const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "role",
  UserPerm: "MANAGE_ROLES",
  BotPerm: "MANAGE_ROLES",
  usage: "(Role) (User)",
  description: "Add/Remove a role for an user",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const target =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[1]);
      if (!target) return client.err(message, "Moderation", "role", 1);
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.find(r => r.name == args[0]);
      if (!role) return client.err(message, "Moderation", "role", 3);
      if (target.roles.cache.has(role.id)) {
        const embed = new MessageEmbed()
          .setTitle("Role Removed")
          .addField("**Moderator**", message.author.tag, true)
          .addField("**User**", target.user.tag, true)
          .setFooter(
            message.member.displayName || message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(client.color)
          .setTimestamp();
        message.inlineReply(embed).then(await target.roles.remove(role));
      } else {
        const embed = new MessageEmbed()
          .setTitle("Role Added")
          .addField("**Moderator**", message.author.tag, true)
          .addField("**User**", target.user.tag, true)
          .setFooter(
            message.member.displayName || message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(client.color)
          .setTimestamp();
        message.inlineReply(embed).then(await target.roles.add(role));
      }
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "role", 999);
    }
  },
};
