const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "lockdown",
  aliases: ["lock"],
  description: "Lock a channel",
  UserPerm: "MANAGE_CHANNELS",
  BotPerm: "MANAGE_CHANNELS",
  category: "Moderation",
  run: async (client, message, args) => {
    message.channel
      .createOverwrite(message.guild.id, { SEND_MESSAGES: false })
      .then(() => {
        const embed = new MessageEmbed()
          .setTitle("Channel Locked")
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
      });
  },
};
