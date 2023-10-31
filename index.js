const NYX = require("./client/NYX");
const client = new NYX();
module.exports = client;
process.on("unhandledRejection", () => {}); // add // when need to debug
client.start();
