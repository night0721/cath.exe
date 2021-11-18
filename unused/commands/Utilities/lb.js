// const Levels = require("discord-xp");
// const { MessageEmbed } = require("discord.js");
// module.exports = {
//   name: "leaderboard",
//   timeout: 5000,
//   description: "Check the leaderboard of a server",
//   category: "Economy",
//   Level: true,
//   run: async (client, interaction, args) => {
//     const rawLeaderboard = await Levels.fetchLeaderboard(
//       interaction.guild.id,
//       10
//     );
//     if (rawLeaderboard.length < 1)
//       return interaction.followUp({ content: "There isn't any data" });
//     const leaderboard = await Levels.computeLeaderboard(
//       client,
//       rawLeaderboard,
//       true
//     );
//     const lb = leaderboard.map(
//       e =>
//         `**${e.position}**. ${e.username}#${e.discriminator} Level: ${
//           e.level
//         } XP: ${e.xp.toLocaleString()}`
//     );
//     const embed = new MessageEmbed()
//       .setTitle(`**Leaderboard for ${interaction.guild.name}**`)
//       .setDescription(`\n${lb.join("\n")}`)
//       .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
//       .setColor(client.color);
//     interaction.followUp({ embeds: [embed] });
//   },
// };
