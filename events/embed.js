const client = require("../");
const { MessageEmbed } = require("discord.js");
const { Welcome } = require("../config.js");
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.id === Welcome
  );
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(
      `<:join:897246825122254848> Hello ${member}, Welcome to NYX's Support Server!`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .addFields(
      {
        name: "Read Rules",
        value: `<#799074874513555496>`,
        inline: true,
      },
      {
        name: "Support Channel",
        value: `<#837865823225511946>`,
        inline: true,
      },
      {
        name: "FAQ",
        value: `<#897345265516822558>`,
        inline: true,
      },
      {
        name: "Badge",
        value: `<#897345265516822558>`,
        inline: true,
      },
      {
        name: "User ID:",
        value: `\`\`\`\n${member.id}\n\`\`\``,
        inline: true,
      }
    )
    .setFooter(
      `${member.user.tag} joined the server!`,
      member.user.displayAvatarURL({ dynamic: true })
    )
    .setColor(client.color)
    .setTimestamp();

  channel.send({ embeds: [embed] });
});
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.id === Welcome
  );
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(
      `<:leave:897246828045680640> ${member.user.username} can't handle being cool! `
    )
    .setThumbnail(member.guild.iconURL({ dynamic: true }))
    .setDescription(`We now only have ${member.guild.memberCount} members`)
    .setFooter(
      `${member.user.tag} left the server!`,
      member.user.displayAvatarURL({ dynamic: true })
    )
    .setColor(client.color)
    .setTimestamp();

  channel.send({ embeds: [embed] });
});
