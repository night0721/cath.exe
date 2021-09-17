module.exports = {
  name: "work",
  description: "Work to earn money",
  category: "Economy",
  timeout: 1000 * 60 * 10,
  run: async (client, interaction, args, utils) => {
    const job = [
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
    const jobs = job[Math.floor(Math.random() * job.length)];
    await client.add(interaction.user.id, earning, interaction);
    interaction.followUp({
      content: `You worked as a **${jobs}** and earned **${earning}${client.currency}**`,
    });
  },
};
