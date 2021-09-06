const { MessageEmbed } = require("discord.js");
const axios = require("axios");

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
    axios
      .get(`https://discord.com/api/v9/users/${user.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`,
        },
      })
      .then(async res => {
        const { banner, accent_color } = res.data;

        if (banner) {
          const extension = banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

          const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s Banner`)
            .setImage(url)
            .setColor(accent_color || "BLUE");

          await interaction.followUp({ embeds: [embed] });
        } else {
          if (accent_color) {
            const embed = new MessageEmbed()
              .setDescription(
                `**${user.tag}** does not have a banner but they have an accent color`
              )
              .setColor(accent_color);

            await interaction.followUp({ embeds: [embed] });
          } else {
            await interaction.followUp({
              content: `**${user.tag}** does not have a banner nor do they have an accent color.`,
            });
          }
        }
      });
  },
};
