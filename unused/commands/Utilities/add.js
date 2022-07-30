module.exports = {
  name: "economy",
  category: "Owner",
  description: "Add/Remove coins from someone",
  Owner: true,
  options: [
    {
      type: "SUB_COMMAND",
      name: "add",
      description: "Remove coins from someone",
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
    },
    {
      type: "SUB_COMMAND",
      name: "rmv",
      description: "Remove coins from someone",
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
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0] === "add") {
      await client.add(args[0], args[1], interaction);
      interaction.followUp({
        content: `<a:nyx_checkmark:897240322411724841> Successfully added **${interaction.options.getInteger(
          "cp"
        )}** ${client.currency} in **${
          interaction.options.getUser("user").username
        }**'s balance`,
      });
    }
    if (args[0] === "rmv") {
      await client.rmv(args[0], args[1]);
      interaction.followUp({
        content: `<a:nyx_checkmark:897240322411724841> Successfully removed **${interaction.options.getInteger(
          "cp"
        )}** ${client.currency} from **${
          interaction.options.getUser("user").username
        }**'s balance`,
      });
    }
  },
};
