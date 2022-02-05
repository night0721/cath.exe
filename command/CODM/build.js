const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const axios = require("axios");
module.exports = {
  name: "build",
  description: "Get gunsmith builds",
  usage: "[Weapon Name] [Author] [Tag]",
  type: "CHAT_INPUT",
  category: "CODM",

  run: async (client, interaction, args) => {
    const cwts = args[1];
    const cc = args[2];
    const tag = args[3];
    const data = await axios
      .get(
        `${process.env.api}/api/v1/codm/build?cwts=${cwts}&cc=${cc}&tag=${tag}`,
        {
          headers: {
            Authorization: process.env.CODM_API_KEY,
          },
        }
      )
      .then(res => res.data)
      .catch(e => null);

    if (!data?.cwts) {
      const embed = new MessageEmbed()
        .setDescription(
          `<:nyx_not_available:897378400031879188> We don't have a **${tag}** gunsmith build for the gun with **CWTS 🆔 ${cwts}** by **${cc}**, Please try another tag or a differnt content creator`
        )
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
    } else {
      const arr = [];
      data.attachments.map((e, i) => {
        return arr.push(`**${i + 1}:** ${e}`);
      });
      const embed = new MessageEmbed()
        .setTitle(
          `${all[tag]} build for ${data.weaponName} from ${data.author}`
        )
        .setDescription(
          `<:nyx_description:897379659665264650> **Description** \`\`\`\n${data.notes}\n \`\`\``
        )
        .setColor(16580400)
        .setImage(data.imageUrl)
        .setFooter({
          text: `Builds Aggregated by ${client.author}`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp()
        .addFields(
          {
            name: "<:nyx_author:897379080549314601> Author:",
            value: `\`\`\`\n${data.author}\n\`\`\``,
            inline: true,
          },
          {
            name: "<a:lastupdate:897381474330873887> Last Updated:",
            value: `\`\`\`\n${moment(Date.parse(data.lastUpdate)).format(
              "MMMM Do YYYY"
            )}\n\`\`\``,
            inline: true,
          },
          {
            name: ":id: CWTS:",
            value: `\`\`\`\n${data.cwts}\n\`\`\``,
            inline: true,
          },
          {
            name: ":paperclip: Attachments:",
            value: arr.join("\n"),
          },
          {
            name: "<a:tags:897034924140404776> Tags",
            value: data.tags.join(", "),
          }
        )
        .setURL(client.web);
      interaction.followUp({
        embeds: [embed],
      });
    }
  },
};
