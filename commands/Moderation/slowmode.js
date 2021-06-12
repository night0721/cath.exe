const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "slowmode",
  UserPerm: "MANAGE_CHANNELS",
  description: "Set slowmode at a specific channel",
  BotPerm: "MANAGE_CHANNELS",
  usage: "(Time)",
  category: "Moderation",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!args[0]) {
        message.channel.setRateLimitPerUser(0);
        const embed = new MessageEmbed()
          .setTitle("Slowmode Removed")
          .addField("**Moderator**", message.author.tag, true)
          .addField("**Channel**", `<#${message.channel.id}>`, true)
          .setFooter(
            message.member.displayName || message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(client.color)
          .setTimestamp();
        message.inlineReply(embed);
      }
      const milliseconds = ms(args[0]);
      if (isNaN(milliseconds))
        return client.err(message, "Moderation", "slowmode", 101);
      if (milliseconds < 1000)
        return client.err(message, "Moderation", "slowmode", 16);
      message.channel.setRateLimitPerUser(milliseconds / 1000);
      const embed = new MessageEmbed()
        .setTitle("Slowmode Added")
        .addField("**Moderator**", message.author.tag, true)
        .addField("**Channel**", `<#${message.channel.id}>`, true)
        .addField(
          "**Rate**",
          ms(milliseconds, {
            long: true,
          }),
          true
        )
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
      return client.err(message, "Moderation", "slowmode", 999);
    }
  },
};
