const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "unmute",
  UserPerms: ["MANAGE_MESSAGES"],
  BotPerms: ["MANAGE_ROLES"],
  usage: "(User)",
  description: "Unmute an user",
  category: "Moderation",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to unmute",
      required: true,
    },
  ],
  run: async (client, interaction, args, utils, data) => {
    try {
      const user = interaction.guild.members.cache.get(args[0]);
      const mutedrole = interaction.guild.roles.cache.get(data.Guild.Muterole);
      if (!mutedrole) {
        interaction.followUp({ content: "Mute role not found in database" });
      }
      await user.roles.remove(mutedrole);
      const embed = new EmbedBuilder()
        .setTitle("User Unmuted")
        .addField("**Moderator**", interaction.user.tag, true)
        .addField("**User**", user.user.tag, true)
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
