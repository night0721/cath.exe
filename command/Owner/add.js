module.exports = {
  name: "add",
  category: "Owner",
  usage: "(Number)",
  description: "Add coins from someone",
  Owner: true,
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to add",
      required: true,
    },
    {
      type: 4,
      name: "cp",
      description: "The amount of CP you want to add",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    await client.add(args[0], args[1], interaction);
    interaction.followUp({
      content: `<a:nyx_checkmark:897240322411724841> Successfully added **${interaction.options.getInteger(
        "cp"
      )}** ${client.currency} in **${
        interaction.options.getUser("user").username
      }**'s balance`,
    });
  },
};
