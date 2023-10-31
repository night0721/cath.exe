const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "ping",
  description: "Check bot latency to Discord API",
  category: "Information",
  run: async (client, interaction, args) => {
    const msg = await interaction.channel.send(`Pinging...`);
    const messageping = msg.createdTimestamp - interaction.createdTimestamp;
    await msg.delete();
    const Embed = new EmbedBuilder()
      .setTitle("<a:pong:897383314405605436> Pong!")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `\n 📨 • **Message Latency** \`${Math.floor(messageping)}ms\`
        \n🛰️ • **Bot Latency** \`${Math.round(client.ws.ping)}ms\``
      )
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor(
        messageping < 350
          ? "#008000"
          : messageping < 500 && messageping > 350
          ? "#ffff31"
          : "#ff0000"
      );
    interaction.followUp({ embeds: [Embed] });
  },
};
