const db = require("../../models/warns");
module.exports = {
  name: "remove-warn",
  aliases: ["rw"],
  UserPerm: "MANAGE_MESSAGES",
  description: "Remove a latest warn for an user",
  usage: "(User)",
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
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r =>
            r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          r =>
            r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        );
      if (!user) return client.err(message, "Moderation", "removeWarn", 1);
      db.findOne(
        { guildid: message.guild.id, user: user.user.id },
        async (err, data) => {
          if (err) throw err;
          if (data) {
            let number = parseInt(args[1]) - 1;
            data.Warns.splice(number, 1);
            const embed = new MessageEmbed()
              .setTitle("Warn Removed")
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
            data.save();
          } else {
            return client.err(message, "Moderation", "removeWarn", 10);
          }
        }
      );
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "removeWarn", 999);
    }
  },
};
