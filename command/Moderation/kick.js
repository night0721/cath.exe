const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kick an user",
  UserPerms: ["KICK_MEMBERS"],
  BotPems: ["KICK_MEMBERS"],
  usage: "(User) {Reason}",
  category: "Moderation",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to kick",
      required: true,
    },
    {
      type: 3,
      name: "reason",
      description: "The reason you want to kick",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const target = interaction.guild.members.cache.get(args[0]);
    let reason = args[1] || "No reason provided";
    if (target.id === interaction.user.id) {
      interaction.followUp({ content: "You can't kick yourself" });
    }
    if (
      interaction.member.roles.highest.position < target.roles.highest.position
    ) {
      interaction.followUp({ content: "You don't have enough hierarchy" });
    }
    if (
      interaction.guild.me.roles.highest.position <
      target.roles.highest.position
    ) {
      interaction.followUp({ content: "Bot doesn't have enough hierarchy" });
    }
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
    try {
      const embed = new MessageEmbed()
        .setTitle("User Kicked")
        .addField("**Moderator**", interaction.user.tag, true)
        .addField("**User**", target.user.tag, true)
        .addField("**Reason**", reason, true)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
      await target.kick(reason);
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
