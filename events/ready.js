const client = require("..");
client.on("ready", async () => {
  console.log(`${client.user.username} ✅`);
});
