const api = require("imageapi.js");
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "cat",
  aliases: ["cats"],
  category: "Fun",
  description: "A cat command",
  run: async (client, message, args) => {
    const wait = await message.inlineReply("Getting cat picture...");
    let subreddits = ["cat", "cats"];
    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const img = await api(subreddit).catch(err => console.log(err));
    const Embed = new MessageEmbed()
      .setTitle(`A cat picture from r/${subreddit}`)
      .setURL(`https://reddit.com/r/${subreddit}`)
      .setColor(client.color)
      .setImage(img)
      .setTimestamp()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
    wait.edit("", { embed: Embed });
  },
};
