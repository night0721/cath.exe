const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "afk",
  description: "Tell someone you are AFK.",
  usage: "{Status}",
  category: "Utilities",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "status",
      description: "The status that shows to user while you are AFK",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const uuser = interaction.guild.members.cache.get(interaction.user.id);
    const content = args[0] || "No status provided.";
    uuser.setNickname(`[AFK] ${interaction.user.username}`).catch();
    await client.data.AFK(interaction.user.id, content);
    const embed = new MessageEmbed()
      .setDescription(
        `${interaction.user.username} is set into AFK.\nStatus : ${content}`
      )
      .setTimestamp()
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setColor(client.color)
      .setAuthor(
        interaction.user.username,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setURL(client.web);
    interaction.followUp({ embeds: [embed] });
  },
};
