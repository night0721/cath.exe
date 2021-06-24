const { Client, Message, Util } = require("discord.js");
module.exports = {
  name: "say",
  description: "Pretend a bot to say",
  usage: "(Words)",
  category: "Fun",
  run: async (client, message, args) => {
    if (!args.length) return;
    message.delete();
    return message.channel.send(Util.cleanContent(args.join(" "), message));
  },
};
