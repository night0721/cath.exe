const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "snipe",
  description: "Snipes a deleted message",
  category: "Utilities",
  options: [
    {
      type: 7,
      name: "channel",
      description: "The sniped channel",
      required: true,
      channelTypes: ["GUILD_TEXT"],
    },
    {
      type: 4,
      name: "message",
      description: "The sniped message",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    var i = 0;
    let description = "";
    const embed = new MessageEmbed()
      .setAuthor(
        `Sniped by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setTimestamp()
      .setURL(client.web);
    const snipes = client.snipes.get(args[0]) || [];
    if (interaction.guild.channels.cache.get(args[0]).type !== "GUILD_TEXT") {
      interaction.followUp({ content: "Please provide a text channel" });
    } else if (args[1]) {
      const msg = snipes[args[1] - 1];
      if (!msg) {
        snipes.forEach(m => {
          const map = [];
          for (var i = 0; i < m.attachment?.length; i++) {
            map.push(
              `**Attchment ${i + 1}:** [Click to view](${m.attachment[i]})`
            );
          }
          if (m.author !== "No Author") {
            description += `\n\n**Author:** ${m.author.username}#${
              m.author.discriminator
            } (Deleted ${moment(m.date).fromNow()})\n**ID:** ${
              m.author.id
            }\n**Content:** ${m.content}\n${map ? map.join("\n") : ""}`;
            i++;
          } else {
            description += `\n\n**Author:** None (Deleted ${moment(
              m.date
            ).fromNow()})\n\n**Content:** ${m.content}\n${
              map ? map.join("\n") : ""
            }`;
            i++;
          }
        });
        embed.setDescription(description);
        return interaction.followUp({ embeds: [embed] });
      } else {
        const map = [];
        for (var i = 0; i < msg.attachment?.length; i++) {
          map.push(
            `**Attchment ${i + 1}:** [Click to view](${msg.attachment[i]})`
          );
        }
        if (msg.author !== "No Author") {
          description += `\n\n**Author:** ${msg.author.username}#${
            msg.author.discriminator
          } (Deleted ${moment(msg.date).fromNow()})\n**ID:** ${
            msg.author.id
          }\n**Content:** ${msg.content}\n${map ? map.join("\n") : ""}`;
          i++;
        } else {
          description += `\n\n**Author:** None (Deleted ${moment(
            msg.date
          ).fromNow()})\n\n**Content:** ${msg.content}\n${
            map ? map.join("\n") : ""
          }`;
          i++;
        }
        embed.setDescription(description);
        return interaction.followUp({ embeds: [embed] });
      }
    } else if (!snipes.length) {
      interaction.followUp({
        content: "There isn't any snipe in this channel yet",
      });
    } else {
      snipes.forEach(m => {
        const map = [];
        for (var i = 0; i < m.attachment?.length; i++) {
          map.push(
            `**Attchment ${i + 1}:** [Click to view](${m.attachment[i]})`
          );
        }
        if (m.author !== "No Author") {
          description += `\n\n**Author:** ${m.author.username}#${
            m.author.discriminator
          } (Deleted ${moment(m.date).fromNow()})\n**ID:** ${
            m.author.id
          }\n**Content:** ${m.content}\n${map ? map.join("\n") : ""}`;
          i++;
        } else {
          description += `\n\n**Author:** None (Deleted ${moment(
            m.date
          ).fromNow()})\n\n**Content:** ${m.content}\n${
            map ? map.join("\n") : ""
          }`;
          i++;
        }
      });
      embed.setDescription(description);
      return interaction.followUp({ embeds: [embed] });
    }
  },
};
