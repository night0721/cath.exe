const { Canvas } = require("canvacord");
const { Client, Message, MessageAttachment } = require("discord.js");
module.exports = {
  name: "trigger",
  aliases: ["triggered"],
  usage: "{User}",
  description: "Have a trigger effect on a user's avatar",
  category: "Fun",
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    const ava = user.displayAvatarURL({ format: "png" });
    const imga = await Canvas.trigger(ava);
    message.inlineReply(new MessageAttachment(imga, "imgae.gif"));
  },
};
