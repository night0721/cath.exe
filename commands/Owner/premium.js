const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "setpremium",
  category: "Owner",
  usage: "(User) (Toggle) (Tier)",
  description: "Set someone into Premium with tiers",
  Owner: true,
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    client.data.Premium(member.id, "true", args[1]);
    message.inlineReply(
      `**${member.user.username}**'s premium status:\nTier **${args[1]}**`
    );
  },
};
