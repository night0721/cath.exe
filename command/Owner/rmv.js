module.exports = {
  name: "rmv",
  category: "Owner",
  usage: "(Number)",
  description: "Remove coins from someone",
  Owner: true,
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to remove",
      required: true,
    },
    {
      type: 4,
      name: "cp",
      description: "The amount of CP you want to remove",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    await client.rmv(args[0], args[1]);
    interaction.followUp({
      content: `<a:nyx_checkmark:897240322411724841> Successfully removed **${interaction.options.getInteger(
        "cp"
      )}** ${client.currency} from **${
        interaction.options.getUser("user").username
      }**'s balance`,
    });
  },
};
