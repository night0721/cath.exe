module.exports = {
  name: "blacklist",
  category: "Owner",
  usage: "(User) (Toggle) (Reason)",
  description: "Manage Blacklisted Users",
  Owner: true,
  options: [
    {
      type: 6,
      name: "user",
      description: "The user to blacklist/whitelist",
      required: true,
    },
    {
      type: 5,
      name: "blacklist",
      description: "Whether to blacklist or whitelist",
      required: true,
    },
    {
      type: 3,
      name: "reason",
      description: "The reason to blacklist",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getUser("user");
    const toggle = interaction.options.getBoolean("blacklist");
    const reason = interaction.options.getString("reason");
    if (toggle === true) {
      await client.data.BK(user.id, toggle, reason);
      const embed = new EmbedBuilder()
        .setTitle(
          "<a:nyx_checkmark:897240322411724841> Successfully Blacklisted"
        )
        .setDescription(
          `**User:** ${user.user.tag} \`(${user.id})\`\n**Reason:** ${reason} \n**Blacklisted by:** ${interaction.member}`
        )
        .setURL(client.web)
        .setColor(client.color)
        .setFooter({
          text: `Made by ${client.author}`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();
      interaction.followUp({ embeds: [embed] });
    } else {
      await client.data.BK(user.id, toggle, reason);
      const embed = new EmbedBuilder()
        .setTitle("<a:nyx_checkmark:897240322411724841> Removed From Blacklist")
        .setDescription(
          `**User:** ${user.user.tag} \`(${user.id})\`\n**Reason:** ${reason} \n**Whitelisted by:** ${interaction.member}`
        )
        .setURL(client.web)
        .setColor(client.color)
        .setFooter({
          text: `Made by ${client.author}`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();
      interaction.followUp({ embeds: [embed] });
    }
  },
};
