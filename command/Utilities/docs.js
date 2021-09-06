const fetch = require("node-fetch");
module.exports = {
  name: "docs",
  usage: "(Query)",
  description: "Search the discord.js docs for something!",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "query",
      description: "The query you want to search",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const query = args.join(" ");
    fetch(
      `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
        query
      )}`
    )
      .then(res => res.json())
      .then(async data => {
        await interaction.followUp({ embeds: [data] });
      });
  },
};
