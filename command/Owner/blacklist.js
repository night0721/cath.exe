module.exports = {
  name: "blacklist",
  category: "Owner",
  usage: "(User) (Toggle) (Reason)",
  description: "Blacklist someone from the bot",
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
      name: "yesno",
      description: "Whether blacklist or whitelist",
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
    const toggle = interaction.options.getBoolean("yesno");
    const reason = interaction.options.getString("reason");
    if (toggle === true) {
      await client.data.BK(user.id, toggle, reason);
      interaction.followUp({
        content: `**Blacklisted** ${user.username}.\n**Reason: **${reason}`,
      });
    } else {
      await client.data.BK(user.id, toggle, reason);
      interaction.followUp({
        content: `Removed blacklist from ${user.username}`,
      });
    }
  },
};
