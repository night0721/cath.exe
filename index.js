const { ShardingManager } = require("discord.js");
const manger = new ShardingManager(`./bot.js`, {
  token: "NzY1NTQyNDI0OTY4ODIyNzg1.X4WU8Q.gEwsAO8uMyJLZ2v7xq_TSRODvfk",
  totalShards: `auto`,
});

manger.on(`shardCreate`, shard => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Spawned shard #${
      shard.id
    }`
  );
});
manger.spawn(manger.totalShards, 10000);
