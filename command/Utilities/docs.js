const axios = require("axios");
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
    await axios
      .get(
        `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
          query
        )}`
      )
      .then(async data => {
        interaction.followUp({ embeds: [data.data] });
      });
  },
};
