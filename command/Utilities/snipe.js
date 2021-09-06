const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "snipe",
  description: "Snipes a deleted message.",
  category: "Utilities",
  run: async (client, interaction, args) => {
    var i = 0;
    var description = "";
    const embed = new MessageEmbed()
      .setAuthor(
        `Sniped by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setColor(client.color)
      .setFooter(`Made by ${client.author}`)
      .setURL(client.web);
    client.snipes.reverse().forEach(msg => {
      if (msg.channel.id != interaction.channel.id) return;
      if (i >= 5) return;
      if (msg.attachment) {
        if (msg.attachment.length == 1) {
          if (msg.author !== "No Author") {
            description =
              description +
              `\n\n**Author:** ${msg.author.username}#${
                msg.author.discriminator
              } (Deleted ${moment(msg.date).fromNow()})\n**ID:** ${
                msg.author.id
              }\n**Content:** ${
                msg.content
              }\n**Attachment URL:** [Click to view](${msg.attachment})`;
            i++;
          } else
            description =
              description +
              `\n\n**Author:** None (Deleted ${moment(
                msg.date
              ).fromNow()})\n\n**Content:** ${
                msg.content
              }\n**Attachment URL:** [Click to view](${msg.attachment})`;
          i++;
        } else if (msg.attachment.length > 1) {
          const map = msg.attachment.map(
            (s, i) => `**${i + 1}:** [Click to view](${s})`
          );
          if (msg.author !== "No Author") {
            description += `\n\n**Author:** ${msg.author.username}#${
              msg.author.discriminator
            } (Deleted ${moment(msg.date).fromNow()})\n**ID:** ${
              msg.author.id
            }\n**Content:** ${msg.content}\n**Attachment URLs:** \n${map.join(
              "\n"
            )}`;
            i++;
          } else
            description += `\n\n**Author:** None (Deleted ${moment(
              msg.date
            ).fromNow()})\\n**Content:** ${
              msg.content
            }\n**Attachment URLs:** \n${map.join("\n")}`;
          i++;
        } else {
          if (msg.author !== "No Author") {
            description =
              description +
              `\n\n**Author:** ${msg.author.username}#${
                msg.author.discriminator
              } (Deleted ${moment(msg.date).fromNow()})\n**ID:** ${
                msg.author.id
              }\n**Content:** ${msg.content}`;
            i++;
          } else
            description =
              description +
              `\n\n**Author:** None (Deleted ${moment(
                msg.date
              ).fromNow()})\n\n**Content:** ${msg.content}`;
          i++;
        }
      } else {
        if (msg.author !== "No Author") {
          description =
            description +
            `\n\n**Author:** ${msg.author.username}#${
              msg.author.discriminator
            } (Deleted ${moment(msg.date).fromNow()})\n**ID:** ${
              msg.author.id
            }\n**Content:** ${msg.content}`;
          i++;
        } else
          description =
            description +
            `\n\n**Author:** None (Deleted ${moment(
              msg.date
            ).fromNow()})\n\n**Content:** ${msg.content}`;
        i++;
      }
    });
    if (i == 0)
      return await interaction.followUp({
        content: "There isn't any snipe in this server yet",
      });
    embed.setDescription(description);
    embed.setTimestamp();
    return await interaction.followUp({ embeds: [embed] });
  },
};
