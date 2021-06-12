const client = require("../index");
const moment = require("moment");
require("../inlinereply");
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  const dataa = await client.data.getUser(message.author.id);
  if (dataa) {
    if (dataa.AFK != null) {
      message.inlineReply(
        `Welcome back <@${dataa.User}>! I have removed your AFK status.`
      );
      const nothahaa = message.guild.members.cache.get(message.author.id);
      nothahaa.setNickname(`${message.author.username}`);
      await client.data.DelAFK(message.author.id);
    } else return;
  } else {
    return;
  }
  if (message.mentions.members.first()) {
    const data1 = await client.data.getUser(
      message.mentions.members.first().id
    );
    if (data1) {
      if (data1.AFK !== null) {
        message.inlineReply(
          message.mentions.members.first().user.tag +
            ` is in afk (${data1.AFK})`
        );
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  }
});
