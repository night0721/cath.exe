module.exports = {
  name: "emojiadd",
  usage: "(Link) (Name)",
  description: "Show an emoji URL or add the emoji to the server",
  category: "Utilities",
  UserPerm: ["MANAGE_EMOJIS_AND_STICKERS"],
  BotPerm: ["MANAGE_EMOJIS_AND_STICKERS"],
  options: [
    {
      type: 3,
      name: "link",
      description: "The link you want to add",
      required: true,
    },
    {
      type: 3,
      name: "name",
      description: "The emoji name you want to add",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      if (args[1].length < 2 || args[1].match(/\W/))
        return client.serr(interaction, "Utilities", "emojiadd", 49);
      interaction.guild.emojis.create(args[0], args[1]).then(msg => {
        const em = interaction.guild.emojis.cache.find(a => a.name == args[1]);
        interaction.followUp(`Added <:${em.name}:${em.id}> to the server`);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
