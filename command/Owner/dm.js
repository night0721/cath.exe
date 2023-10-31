module.exports = {
  name: "dm",
  category: "Owner",
  usage: "(User) (Message)",
  description: "DM a user",
  Owner: true,
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to send",
      required: true,
    },
    {
      type: 3,
      name: "msg",
      description: "The message you want to send",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser("user");
    if (!user) return interaction.followUp("User?");
    if (!args[1]) return interaction.followUp("Message?");
    try {
      await user
        .send({ content: args[1] })
        .then(() => interaction.followUp({ content: `Sent message` }));
    } catch (err) {
      interaction.user.send({ content: "That user can't be dmed" });
    }
  },
};
