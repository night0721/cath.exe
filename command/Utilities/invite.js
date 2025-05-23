const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get bot invite link or get support",
  category: "Utilities",

  run: async (client, interaction, args, utils) => {
    const embed = new EmbedBuilder()
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(client.color)
      .setTimestamp()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle(`Support/Invite`)
      .setThumbnail(
        "https://github.com/night0721/cath.js/blob/master/util/assets/images/nyx_logo_transparent.webp"
      )
      .addFields([
        {
          name: "<a:booster:896527475063025704> **Premium**",
          value:
            "**You can either boost support server or subscribe to developer's team [Ko-Fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team.**",
          inline: true,
        },
      ]);
    interaction.followUp({
      content: "Please click the buttons below for more information",
      embeds: [embed],
      components: utils.buttons(client),
    });
  },
};
