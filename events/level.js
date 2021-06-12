const Levels = require("discord-xp");
const client = require("../index");
const users = require("../models/users");
Levels.setURL(require("../config.json").mongo);
client.on("message", async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  const user = await client.data.getUser(message.author.id);
  var max = 30;
  if (user) {
    if (user.Tier) {
      if (user.Tier == 1) max = 120;
      if (user.Tier == 2) max = 90;
      if (user.Tier == 3) max = 60;
    }
  }
  const randomAmountOfXp = client.function.rndint(10, max);
  if (client.xp.includes(message.guild.id)) return;
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomAmountOfXp
  );
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
  }
});
