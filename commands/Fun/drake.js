const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "drake",
  description: "Drake meme",
  usage: "(Text) (Text)",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const t1 = args[0];
    const t2 = args.slice(1).join(" ");
    const res = await fetch(
      `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${t1}&text2=${t2}`,
      {}
    );
    let i = await res.buffer();
    const drake = new MessageAttachment(i);
    message.inlineReply(drake);
  },
};
