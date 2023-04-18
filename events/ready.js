const client = require("..");
const version = require("../package.json").version;
const starboardClient = require("../client/StarboardClient");
const g = require("../models/guilds");
client.on("ready", async () => {
  client.manager.init(client.user.id);
  const data = await g.find();
  starboardClient.config.guilds.set(
    data.map(x => {
      return {
        id: x.Guild,
        options: { starCount: x.StarCount, starboardChannel: x.Starboard },
      };
    })
  );
  console.log(`${client.user.username} ✅\nVersion: v${version}`);
});
