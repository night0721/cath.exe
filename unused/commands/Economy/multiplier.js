const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "multiplier",
  description: "Displaying your/user's multiplier.",
  category: "Economy",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    let i = "";
    let e = 0;
    const user =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const data = await client.data.getUser(
      args[0] ? args[0] : interaction.member.id
    );
    if (data?.Premium) {
      i += "\nPremium User - 25%\n";
      e += 25;
    }
    if (client.path.includes(interaction.guild.id)) {
      i += "NYX Partnered Server - 15%\n";
      e += 15;
    }
    if (interaction.channel.name.toLowerCase().includes("nyx")) {
      i += "Channel Name includes NYX - 10%\n";
      e += 10;
    }
    const embed = new EmbedBuilder()
      .addField(`**Total Multiplier: ${e}%** (Maximum: 50%)`, i)
      .setColor(client.color)
      .setURL(client.web)
      .setTitle(`${user.displayName}'s Multiplier`)
      .setTimestamp()
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      });
    interaction.followUp({ embeds: [embed] });
  },
};
