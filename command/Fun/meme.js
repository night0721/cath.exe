const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "meme",
  category: "Fun",
  description: "Get a meme from reddit",
  run: async (client, interaction, args) => {
    let subreddits = ["comedyheaven", "dank", "meme", "memes"];
    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    fetch(`https://www.reddit.com/r/${subreddit}/random/.json`).then(
      async res => {
        let content = await res.json();
        let permalink = content[0].data.children[0].data.permalink;
        let memeURL = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        const memeEmbed = new MessageEmbed()
          .setTitle(`${memeTitle}`)
          .setAuthor(
            interaction.member.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true })
          )
          .setURL(`${memeURL}`)
          .setImage(memeImage)
          .setTimestamp()
          .setColor(client.color)
          .setFooter(` 👍 ${memeUpvotes} 💬 ${memeNumComments}`);
        await interaction.followUp({ embeds: [memeEmbed] });
      }
    );
  },
};
