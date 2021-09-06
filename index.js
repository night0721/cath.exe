const { ShardingManager } = require("discord.js");
require("dotenv").config();
const manager = new ShardingManager(`./bot.js`, {
  token: process.env.TOKEN,
  totalShards: "auto",
});

manager.on(`shardCreate`, shard => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Spawned shard #${
      shard.id
    }`
  );
});
manager.spawn({ delay: 5500, timeout: 30000 });
