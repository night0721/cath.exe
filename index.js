const NYX = require("./client/NYX");
const client = new NYX();
module.exports = client;
// Add // when need to debug
//process.on("unhandledRejection", () => {});
client.start();
