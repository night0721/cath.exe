const db = require("../../models/warns");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "warn",
  UserPerm: "MANAGE_MESSAGES",
  usage: "(User) {Reason}",
  description: "Warn a user",
  category: "Moderation",
  run: async (client, message, args) => {
    try {
      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user) return client.err(message, "Moderation", "warn", 1);
      const reason = args.slice(1).join(" ") || "No reason provided";
      db.findOne(
        { Guild: message.guild.id, User: user.id },
        async (err, data) => {
          if (!data) {
            data = new db({
              Guild: message.guild.id,
              User: user.id,
              Warns: [
                {
                  Reason: reason,
                },
              ],
            });
          } else {
            const obj = {
              Reason: reason,
            };
            data.Warns.push(obj);
          }
          data.save();
        }
      );
      user.send(
        `You have been warned in **${message.guild.name}** for **${reason}**`
      );
      const embed = new MessageEmbed()
        .setTitle("User Warned")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**User**", user.user.tag, true)
        .addField("**Reason**", reason, true)
        .setFooter(
          message.member.displayName || message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .setTimestamp();
      message.reply(embed);
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "warn", 1);
    }
  },
};
