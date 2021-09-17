const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "simprate",
  description: "Check how simp is the user",
  usage: "(@User)",
  category: "Fun",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let simp = Math.floor(Math.random() * 100);
    let user = interaction.guild.members.cache.get(args[0]);
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setTitle(`${user.user.username}'s simp rate`)
          .setDescription(`${user.user.username} is a ${simp}% simp`)
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`)
          .setTimestamp()
          .setAuthor(
            `Requested by ${interaction.user.tag}`,
            interaction.user.displayAvatarURL({ dynamic: true })
          ),
      ],
    });
  },
};
