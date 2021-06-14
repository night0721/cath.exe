const fetch = require("node-fetch");
module.exports = {
  name: "docs",
  usage: "(Query)",
  description: "Search the discord.js docs for something!",
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return client.err(message, "Utilities", "docs", 51);
    fetch(
      `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
        query
      )}`
    )
      .then(res => res.json())
      .then(data => {
        message.inlineReply({ embed: data });
      });
  },
};
