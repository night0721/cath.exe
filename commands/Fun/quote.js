const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const { Canvas } = require("canvacord");
module.exports = {
  name: "quote",
  description: "Quote a message",
  usage: "{User} (Message)",
  category: "Fun",
  run: async (client, message, args) => {
    const member = message.mentions.users.first() || message.author;
    if (message.mentions.users.first()) {
      const imgae = await Canvas.quote({
        image: member.displayAvatarURL({
          format: "png",
        }),
        message: args.slice(1).join(" "),
        username: member.displayName ? member.displayName : member.username,
        color: "ffffff",
      });
      const attach = new MessageAttachment(imgae, "quote.png");
      message.inlineReply(attach);
    } else {
      const imgae = await Canvas.quote({
        image: message.author.displayAvatarURL({
          format: "png",
        }),
        message: args.join(" "),
        username: message.member.nickname
          ? message.member.nickname
          : member.username,
        color: "ffffff",
      });
      const attach = new MessageAttachment(imgae, "quote.png");
      message.inlineReply(attach);
    }
  },
};
