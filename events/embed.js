const client = require("../");
const { EmbedBuilder } = require("discord.js");
const { Welcome } = require("../config.js");
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.id == Welcome
  );
  if (!channel) return;
  channel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(
          `<:join:897246825122254848> Hello ${member}, Welcome to NYX's Support Server!`
        )
        .setThumbnail(
          member.user.displayAvatarURL({ dynamic: true, size: 512 })
        )
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
        .setFooter({
          text: `${member.user.tag} joined the server!`,
          iconURL: member.user.displayAvatarURL({ dynamic: true }),
        })
        .setColor(client.color)
        .setTimestamp(),
    ],
  });
});
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.id == Welcome
  );
  if (!channel) return;
  channel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(
          `<:leave:897246828045680640> ${member.user.username} can't handle being cool! `
        )
        .setThumbnail(member.guild.iconURL({ dynamic: true }))
        .setDescription(`We now only have ${member.guild.memberCount} members`)
        .setFooter({
          text: `${member.user.tag} left the server!`,
          iconURL: member.user.displayAvatarURL({ dynamic: true }),
        })
        .setColor(client.color)
        .setTimestamp(),
    ],
  });
});
