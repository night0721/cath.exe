const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "announce",
  UserPerm: "MANAGE_MESSAGES",
  BotPerm: "MANAGE_MESSAGES",
  usage: "{Channel} (Message)",
  description: "Announce a message to a channel.",
  category: "Moderation",
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.channel;
    if (!args[0]) return client.err(message, "Moderation", "announce", 4);
    try {
      message.delete();
      channel.send(
        new MessageEmbed()
          .setAuthor(
            `Sent by ${message.member.displayName}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(args.slice(0).join(" "))
          .setTimestamp()
          .setColor(client.color)
      );
      message.reply(
        new MessageEmbed()
          .setTitle(`Message Announced`)
          .addField("**Moderator**", message.author.tag, true)
          .setTimestamp()
          .setFooter(
            message.member.displayName,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor(client.color)
      );
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "announce", 999);
    }
  },
};
