const client = require("../bot");
const version = require("../package.json").version;
client.on("ready", async () => {
  client.manager.init(client.user.id);
  console.log(`${client.user.username} ✅\nVersion: v${version}`);
});
