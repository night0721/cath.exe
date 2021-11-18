const client = require("..");
const starboardclient = require("../client/StarboardClient");
client.on("messageReactionAdd", async reaction => {
  starboardclient.listener(reaction);
});
client.on("messageReactionRemove", async reaction => {
  starboardclient.listener(reaction);
});
