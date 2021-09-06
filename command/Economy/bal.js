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
      description: "The user you want to hack",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const user = interaction.guild.members.cache.get(args[0]);
    const bal = await client.bal(user.id);
    let embed = new MessageEmbed()
      .addField(`${client.currency} Balance`, `**${bal}**`)
      .setColor(client.color)
      .setURL(client.web)
      .setTitle(`${user.displayName}'s Balance`)
      .setTimestamp()
      .setFooter(`Requested by ${client.author}`);
    await interaction.followUp({ embeds: [embed] });
  },
};
