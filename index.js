const NYX = require("./client/NYX");
const client = new NYX();
module.exports = client;
process.on("unhandledRejection", () => {});
client.start();
