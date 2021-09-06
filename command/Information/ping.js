const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  description: "Check bot latency to Discord API",
  type: "CHAT_INPUT",
  category: "Information",
  run: async (client, interaction, args) => {
    const msg = await interaction.channel.send(`Pinging...`);
    const messageping = msg.createdTimestamp - interaction.createdTimestamp;
    await msg.delete();
    const Embed = new MessageEmbed()
      .setTitle("🏓 Pong!")
      .setAuthor(
        `${interaction.user.username}`,
        interaction.user.displayAvatarURL()
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
    await interaction.followUp({ embeds: [Embed] });
  },
};
