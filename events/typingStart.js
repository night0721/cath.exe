const { ChannelType } = require("discord.js");
const client = require("..");
client.on("typingStart", async typing => {
  if (
    !typing.user ||
    typing.user.bot ||
    !typing.channel ||
    typing.channel.type != ChannelType.DM
  )
    return;
  typing.user.send({
    content:
      "```DMs is reserved for bug reports/suggestions/feedbacks/queries and is forwarded to the developers. Please refrain from using it as a clipboard or trying to run commands in here [by violating this condition, you agree to let us sell your data]```",
  });
});
