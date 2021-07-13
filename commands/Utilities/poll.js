const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "poll",
  description: "Start a poll in a channel",
  category: "Utilities",
  Owner: true,
  run: async (client, message, args) => {
    let pollDescription = `
      ${message.author} asks: ${args.slice(1).join(" ")}
    `;
    const channel = message.mentions.channels.first();
    if (!channel) return client.err(message, "Utilities", "poll", 28);
    if (!pollDescription) return client.err(message, "Utilities", "poll", 12);
    let embedPoll = new MessageEmbed()
      .setTitle(`${message.author.username} made a poll`)
      .setDescription(pollDescription)
      .setFooter(`Made by ${client.author}`)
      .setTimestamp()
      .setColor("GREEN");
    let msgEmbed = await channel.send(embedPoll);
    await msgEmbed.react("👍");
    await msgEmbed.react("👎");
  },
};
