const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "lockdown",
  description: "Lock a channel",
  UserPerms: ["MANAGE_CHANNELS"],
  BotPerms: ["MANAGE_CHANNELS"],
  category: "Moderation",
  options: [
    {
      type: 5,
      name: "choice",
      description: "Whether lock or unlock the channel",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0]) {
      interaction.channel.permissionOverwrites
        .create(interaction.guild.id, { SEND_MESSAGES: false })
        .then(() => {
          const embed = new MessageEmbed()
            .setTitle("Channel Locked")
            .addField("**Moderator**", interaction.user.tag, true)
            .addField("**Channel**", `<#${interaction.channel.id}>`, true)
            .setFooter(
              `Made by ${client.author}`,
              client.user.displayAvatarURL()
            )
            .setTimestamp()
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.color);
          interaction.followUp({ embeds: [embed] });
        });
    } else {
      interaction.channel.permissionOverwrites
        .create(interaction.guild.id, { SEND_MESSAGES: true })
        .then(() => {
          const embed = new MessageEmbed()
            .setTitle("Channel Unlocked")
            .addField("**Moderator**", interaction.user.tag, true)
            .addField("**Channel**", `<#${interaction.channel.id}>`, true)
            .setFooter(
              `Made by ${client.author}`,
              client.user.displayAvatarURL()
            )
            .setTimestamp()
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.color);
          interaction.followUp({ embeds: [embed] });
        });
    }
  },
};
