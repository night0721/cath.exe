const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "messageinfo",
  run: async (client, message, args) => {
    try {
      if (!args[0]) return client.err(message, "Utilities", "Fun", 27);
      await message.channel.messages.fetch(args[0]).catch(err => {
        return message.inlineReply("Message not found in this channel..");
      });
      const msg = await message.channel.messages.cache.get(args[0]);
      console.log(msg);
      const hasImage = msg.attachments.size && msg.attachments.first().width;
      const embed = new MessageEmbed()
        .setColor(msg.member ? msg.member.displayHexColor : client.color)
        .setImage(hasImage ? msg.attachments.first().url : null)
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .addField("Content", msg.content)
        .setTimestamp(msg.createdAt)
        .addField("ID", msg.id)
        .setFooter(`Made by ${client.author}`)
        .addField("Jump", `[Click Here to Jump](${msg.url})`);
      return message.inlineReply(embed);
    } catch (err) {
      console.log(err);
    }
  },
};
