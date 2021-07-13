const Levels = require("discord-xp");
const client = require("../bot");
require("dotenv").config();
Levels.setURL(process.env.MONGO);
client.on("message", async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  const guild = await client.data.getGuild(message.guild.id);
  if (guild.Level == false) return;
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
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomAmountOfXp
  );
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
  }
});
