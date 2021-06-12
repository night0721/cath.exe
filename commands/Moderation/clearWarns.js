const db = require("../../models/warns");
module.exports = {
  name: "clear-warns",
  aliases: ["cw"],
  usage: "(User)",
  description: "Clear an user's warns",
  UserPerm: "MANAGE_MESSAGES",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    if (!user) {
      return client.err(message, "Moderation", "clearWarns", 1);
    }
    db.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (data) {
          await db.findOneAndDelete({
            Guild: message.guild.id,
            User: user.id,
          });
          return message.inlineReply(
            new MessageEmbed()
              .setTitle(`Warns Cleared`)
              .addField("**Moderator**", message.author.tag, true)
              .addField("**User**", user.tag, true)
              .setTimestamp()
              .setFooter(
                message.member.displayName,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setColor(client.color)
          );
        } else {
          return client.err(message, "Moderation", "clearWarns", 10);
        }
      }
    );
  },
};
