const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "purge",
  aliases: ["clear", "c"],
  UserPerm: "MANAGE_MESSAGES",
  BotPerm: "MANAGE_MESSAGES",
  description: "Clear/Purge 1-100 messages in the channel",
  usage: "(Number)",
  category: "Moderation",
  run: async (client, message, args) => {
    if (
      !args[0] ||
      isNaN(args[0]) ||
      parseInt(args[0]) > 100 ||
      parseInt(args[0] < 0)
    )
      return client.err(message, "Moderation", "clear", 7);
    const messages = await message.channel.messages.fetch({
      limit: parseInt(args[0]),
    });
    const usable = messages.filter(
      m => m.createdTimestamp - Date.now() < ms("14d") && !m.pinned
    );
    await message.delete();
    await message.channel.bulkDelete(usable).then(() =>
      message.channel
        .send(
          new MessageEmbed()
            .setTitle(`Message Cleared`)
            .addField("**Moderator**", message.author.tag, true)
            .setTimestamp()
            .setFooter(
              message.member.displayName,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setColor(client.color)
        )
        .then(m => m.delete({ timeout: 10000 }))
    );
  },
};
