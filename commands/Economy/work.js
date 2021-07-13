const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "work",
  description: "Work to earn money",
  category: "Economy",
  timeout: 1000 * 60 * 10,
  run: async (client, message, args) => {
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
    const earning = client.function.rndint(5000, 3000);
    const jobs = job[Math.floor(Math.random() * job.length)];
    await client.add(message.author.id, earning, message);
    return message.inlineReply(
      `You worked as a **${jobs}** and earned **${earning}${client.currency}**`
    );
  },
};
