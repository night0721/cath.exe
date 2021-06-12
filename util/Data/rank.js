const { MessageAttachment } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const error = require("../util/err");
require("../inlinereply");
module.exports = {
  name: "rank",
  description: "Shows the current level and rank of the user!",
  usage: "{@User/User ID}",
  timeout: 5000,
  run: async (client, message, args) => {
    const p = await client.prefix(message);
    if (!message.guild) return;
    if (message.author.bot) return;
    const target =
      message.mentions.users.first() ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    const user = await Levels.fetch(target.id, message.guild.id, true);
    if (!user)
      return error(
        message,
        message.author,
        p,
        "rank",
        "**{@User/User ID}**",
        `'User' doesn't have any XP`
      );
    const neededXp = Levels.xpFor(parseInt(user.level) + 1);
    const Rank = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
      .setCurrentXP(user.xp)
      .setRank(parseInt(user.position))
      .setLevel(user.level)
      .setRequiredXP(neededXp)
      .setStatus(target.presence.status)
      .setProgressBar("BLACK", "COLOR")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator);
    Rank.build().then(data => {
      const attachment = new MessageAttachment(data, "RankCard.png");
      message.inlineReply(attachment);
    });
  },
};
