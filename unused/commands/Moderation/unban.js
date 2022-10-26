const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "unban",
  description: "Unban an user",
  UserPerms: ["BAN_MEMBERS"],
  BotPerms: ["BAN_MEMBERS"],
  usage: "(User)",
  category: "Moderation",
  options: [
    {
      type: 6,
      name: "user",
      description: "The person you want to unban",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      const user = await interaction.guild.members.unban(args[0]);
      const embed = new EmbedBuilder()
        .setTitle("User Unbanned")
        .addField("**Moderator**", interaction.user.tag, true)
        .addField("**User**", user.tag, true)
        .setFooter({
          text: `Made by ${client.author}`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
