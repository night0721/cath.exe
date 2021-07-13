const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  description: "Check bot latency to Discord API",
  run: async (client, message, args) => {
    const msg = await message.channel.send("Pinging...");
    const messageping = msg.createdTimestamp - message.createdTimestamp;
    const Embed = new MessageEmbed()
      .setTitle("🏓 Pong!")
      .setAuthor(
        `${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setDescription(
        `📨 • **Message Latency** \`${Math.floor(
          messageping
        )}ms\`\n🛰️ • **Bot Latency** \`${Math.round(client.ws.ping)}ms\``
      )
      .setColor(
        messageping < 350
          ? "GREEN"
          : messageping < 500 && messageping > 350
          ? "YELLOW"
          : "RED"
      );
    msg.edit("", Embed);
  },
};
