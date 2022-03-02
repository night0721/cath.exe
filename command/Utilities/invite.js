const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get bot invite link or get support",
  category: "Utilities",
  type: "CHAT_INPUT",
  run: async (client, interaction, args, utils) => {
    const embed = new MessageEmbed()
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setColor(client.color)
      .setTimestamp()
      .setAuthor({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle(`Support/Invite`)
      .setThumbnail(
        "https://github.com/night0721/cath.js/blob/master/util/assets/images/nyx_logo_transparent.webp"
      )
      .addField(
        "<a:booster:896527475063025704> **Premium**",
        "**You can either boost support server or subscribe to developer's team [Ko-Fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team.**"
      );
    interaction.followUp({
      content: "Please click the buttons below for more information",
      embeds: [embed],
      components: utils.buttons(client),
    });
  },
};
