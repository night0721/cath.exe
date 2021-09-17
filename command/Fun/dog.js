const { MessageEmbed } = require("discord.js");
const { getreddit } = require("cath");
module.exports = {
  name: "dog",
  category: "Fun",
  description: "Get a dog from reddit",
  run: async (client, interaction, args) => {
    let subreddits = ["dog", "dogs"];
    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const data = await getreddit(subreddit);
    await interaction.followUp({
      embeds: [
        new MessageEmbed({
          title: data.title,
          url: data.url,
          image: { url: data.image },
          timestamp: Date.now(),
          footer: { text: data.footer },
          color: client.color,
          author: {
            name: interaction.member.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          },
        }),
      ],
    });
  },
};
