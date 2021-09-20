const client = require("../bot");
const starboardclient = require("../client/StarboardClient");
client.on("messageReactionAdd", async (reaction, user) => {
  starboardclient.listener(reaction);
});
client.on("messageReactionRemove", async reaction => {
  starboardclient.listener(reaction);
});
