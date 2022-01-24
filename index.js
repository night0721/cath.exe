const { HTTPError, DiscordAPIError } = require("discord.js");
const NYX = require("./client/NYX");
const client = new NYX();
module.exports = client;
process.on("unhandledRejection", err => {
  console.error(err);
});
client.start();
