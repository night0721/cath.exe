const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "balance",
  description: "Show an user's balance",
  usage: "(User)",
  category: "Economy",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const bal = await client.bal(user.id);
    const embed = new MessageEmbed()
      .setTitle(`${user.displayName}'s Balance`)
      .setDescription(`**${bal}** ${client.currency}`)
      .setColor(client.color)
      .setURL(client.web)
      .setTimestamp()
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL());
    interaction.followUp({ embeds: [embed] });
  },
};
