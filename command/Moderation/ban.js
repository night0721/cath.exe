const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  description: "Ban an user",
  BotPerms: ["BAN_MEMBERS"],
  UserPerms: ["BAN_MEMBERS"],
  usage: "(User) {Reason}",
  category: "Moderation",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to ban",
      required: true,
    },
    {
      type: 3,
      name: "reason",
      description: "The reason you want to ban",
      required: false,
    },
    {
      type: 4,
      name: "messages",
      description:
        "Number of days of messages to delete, must be between 0 and 7, inclusive",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const target = interaction.guild.members.cache.get(args[0]);
    let reason = args[1] || "No reason provided";
    const days = args[2] || 0;
    if (days > 7 || days < 0) {
      interaction.followUp({
        content:
          "Number of days of messages to delete must be between 0 and 7, inclusive",
      });
    } else if (!target) {
      try {
        const one = await client.users.fetch(args[0]);
        if (one.id === interaction.user.id) {
          interaction.followUp({ content: "You can't ban yourself" });
        }
        if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
        const embed = new MessageEmbed()
          .setTitle("User Banned")
          .addField("**Moderator**", interaction.user.tag, true)
          .addField("**User**", one.tag, true)
          .addField("**Reason**", reason, true)
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor(client.color);
        interaction.followUp({ embeds: [embed] });
        await interaction.guild.members.ban(one.id, {
          reason,
          days,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      if (target.id === interaction.user.id) {
        interaction.followUp({ content: "You can't ban yourself" });
      }
      if (
        interaction.member.roles.highest.position <
        target.roles.highest.position
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
          .setTitle("User Banned")
          .addField("**Moderator**", interaction.user.tag, true)
          .addField("**User**", target.user.tag, true)
          .addField("**Reason**", reason, true)
          .addField(
            "Number of days of messages to delete",
            days.toString(),
            true
          )
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor(client.color);
        interaction.followUp({ embeds: [embed] });
        await interaction.guild.members.ban(target.id, {
          reason,
          days,
        });
      } catch (e) {
        console.log(e);
        interaction.followUp({ content: `**Error**: ${e.message}` });
      }
    }
  },
};
