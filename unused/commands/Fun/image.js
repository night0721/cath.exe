const { MessageEmbed } = require("discord.js");
const { getreddit } = require("cath");
module.exports = {
  name: "image",
  description: "Generate images",
  options: [
    {
      type: "SUB_COMMAND",
      name: "meme",
      description: "Get a meme from reddit",
    },
    {
      type: "SUB_COMMAND",
      name: "cat",
      description: "Get a cat from reddit",
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0] == "meme") {
      const subreddits = ["comedyheaven", "dank", "meme", "memes"];
      const subreddit =
        subreddits[Math.floor(Math.random() * subreddits.length)];
      const data = await getreddit(subreddit);
      interaction.followUp({
        embeds: [
          new MessageEmbed({
            title: data.title,
            url: data.url,
            image: { url: data.image },
            timestamp: Date.now(),
            footer: { text: data.footer },
            color: client.color,
            author: {
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          }),
        ],
      });
    } else if (args[0] === "cat") {
      const subreddits = ["cat", "cats"];
      const subreddit =
        subreddits[Math.floor(Math.random() * subreddits.length)];
      const data = await getreddit(subreddit);
      interaction.followUp({
        embeds: [
          new MessageEmbed({
            title: data.title,
            url: data.url,
            image: { url: data.image },
            timestamp: Date.now(),
            footer: { text: data.footer },
            color: client.color,
            author: {
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          }),
        ],
      });
    }
  },
};
