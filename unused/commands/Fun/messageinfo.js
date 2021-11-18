const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "messageinfo",
  category: "Information",
  type: "CHAT_INPUT",
  description: "Check the info of a message",
  options: [
    {
      type: 3,
      name: "message",
      description: "The message you want to see",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      await interaction.channel.messages.fetch(args[0]).catch(() => {
        interaction.followUp({
          content: "Message not found in this channel..",
        });
      });
      const msg = await interaction.channel.messages.cache.get(args[0]);
      const hasImage = msg.attachments.size && msg.attachments.first().width;
      const embed = new MessageEmbed()
        .setColor(msg.member ? msg.member.displayHexColor : client.color)
        .setImage(hasImage ? msg.attachments.first().url : null)
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ format: "png", dynamic: true })
        )
        .addField("Content", msg.content || "No content")
        .setTimestamp(msg.createdAt)
        .addField("ID", msg.id)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .addField("Jump", `[Click Here to Jump](${msg.url})`);
      return interaction.followUp({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
