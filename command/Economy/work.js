const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "work",
  description: "Work to earn money",
  category: "Economy",
  timeout: 1000 * 60 * 10,
  run: async (client, interaction, args, utils) => {
    const jobs = [
      "Software engineer",
      "Programmer",
      "Teacher",
      "YouTuber",
      "Student",
      "Desginer",
      "Editor",
      "Banker",
    ];
    const earning = utils.rndint(5000, 3000);
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    await client.add(interaction.user.id, earning, interaction);
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `Good Job! You worked as a **${job}** and earned **${earning}${client.currency}**`
          )
          .setTimestamp()
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setColor(client.color),
      ],
    });
  },
};
