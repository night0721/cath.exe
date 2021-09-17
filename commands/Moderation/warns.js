const db = require("../../models/warns");
const { Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "warns",
  UserPerm: "MANAGE_MESSAGES",
  description: "Check the warns of an user",
  usage: "{User}",
  category: "Moderation",
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
        ) ||
        message.author;
      db.findOne(
        { Guild: message.guild.id, User: user.id },
        async (err, data) => {
          if (data) {
            message.channel.send(
              new MessageEmbed()
                .setTitle(`${user.user.tag}'s warns`)
                .setDescription(
                  data.Warns.map(
                    (w, i) => `\`${i + 1}\` | Reason : ${w.Reason}`
                  )
                )
                .setTimestamp()
                .setColor(client.color)
            );
          } else {
            return client.err(message, "Moderation", "warns", 10);
          }
        }
      );
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "warns", 999);
    }
  },
};
