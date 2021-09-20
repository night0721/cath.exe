const Discord = require("discord.js");
module.exports = {
  name: "slowmode",
  UserPerms: ["MANAGE_CHANNELS"],
  description: "Set slowmode at a specific channel",
  BotPerm: "MANAGE_CHANNELS",
  usage: "(Time)",
  category: "Moderation",
  run: async (client, interaction, args, utils) => {
    await interaction.deleteReply();
    const menu = new Discord.MessageSelectMenu()
      .setCustomId("select")
      .setPlaceholder("Select a time")
      .addOptions([
        { label: "OFF", value: "OFF" },
        { label: "5s", value: "5s" },
        { label: "10s", value: "10s" },
        { label: "15s", value: "15s" },
        { label: "30s", value: "30s" },
        { label: "1m", value: "1m" },
        { label: "2m", value: "2m" },
        { label: "5m", value: "5m" },
        { label: "10m", value: "10m" },
        { label: "15m", value: "15m" },
        { label: "30m", value: "30m" },
        { label: "1h", value: "1h" },
        { label: "2h", value: "2h" },
        { label: "6h", value: "6h" },
      ]);
    let row = new Discord.MessageActionRow().addComponents(menu);
    const slowmoEmbed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setTitle("Slowmode")
      .setFooter(`Made by ${client.author}`)
      .setTimestamp()
      .setAuthor(
        `Requested by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL({ dynmiac: true })
      );
    interaction.channel
      .send({ embeds: [slowmoEmbed], components: [row] })
      .then(sent => {
        const filter = i => {
          i.deferUpdate();
          if (i.user.id === interaction.user.id) return true;
          return;
        };
        const collector = sent.createMessageComponentCollector({
          filter,
          componentType: "SELECT_MENU",
          time: 30e3,
        });

        collector.on("collect", collected => {
          collector.resetTimer({ time: 30e3 });
          menu.setPlaceholder(`Set to: ${collected.values[0]}`);
          row = new Discord.MessageActionRow().addComponents(menu);
          if (collected.values[0] !== "OFF") {
            const embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setTitle("Slowmode Added")
              .addField("**Moderator**", interaction.user.tag, true)
              .addField("**Channel**", `<#${interaction.channel.id}>`, true)
              .addField(
                "**Rate**",
                `${utils.ms(utils.ms(collected.values[0]), { long: true })}`,
                true
              )
              .setFooter(
                interaction.member.displayName || interaction.user.username,
                interaction.user.displayAvatarURL({ dynamic: true })
              )
              .setThumbnail(client.user.displayAvatarURL());
            interaction.channel.setRateLimitPerUser(
              utils.ms(collected.values[0]) / 1e3
            );
            return sent.edit({ embeds: [embed], components: [row] });
          } else {
            const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Slowmode Removed")
              .addField("**Moderator**", interaction.user.tag, true)
              .addField("**Channel**", `<#${interaction.channel.id}>`, true)
              .setFooter(
                interaction.member.displayName || interaction.user.username,
                interaction.user.displayAvatarURL({ dynamic: true })
              )
              .setThumbnail(client.user.displayAvatarURL())
              .setColor("RED");
            interaction.channel.setRateLimitPerUser(0);
            return sent.edit({ embeds: [embed], components: [row] });
          }
        });

        collector.on("end", () => {
          menu.setDisabled(true);
          row = new Discord.MessageActionRow().addComponents(menu);
          return sent.edit({ components: [row] });
        });
      });
  },
};
