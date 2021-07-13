const client = require("../bot");
client.on("typingStart", async (channel, user) => {
  if (!user) return;
  if (user.bot) return;
  if (!channel) return;
  if (channel.type != "dm") return;
  user.send(
    "```DMs is reserved for bug reports/suggestions/feedbacks/queries and is forwarded to the developers. Please refrain from using it as a clipboard or trying to run commands in here [by violating this condition, you agree to let us sell your data]```"
  );
});
