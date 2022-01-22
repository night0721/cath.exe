const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "banner",
  description: "Show user's banner",
  type: "CHAT_INPUT",
  usage: "{User}",
  category: "Information",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const { user } =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const data = await user.fetch();
    if (data?.banner) {
      const extension = data.banner.startsWith("a_") ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${extension}?size=2048`;

      const embed = new MessageEmbed()
        .setDescription(`[Link to Banner](${url})`)
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setTitle(`${user.tag}'s Banner`)
        .setImage(url)
        .setColor(data?.hexAccentColor || client.color);
      interaction.followUp({ embeds: [embed] });
    } else if (data?.hexAccentColor) {
      const embed = new MessageEmbed()
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(
          `**${user.tag}** does not have a banner but they have an accent color`
        )
        .setColor(data?.hexAccentColor);
      interaction.followUp({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(
          `Seems like **${user.username}** doesn't have a banner or an accent color.`
        )
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
    }
  },
};
