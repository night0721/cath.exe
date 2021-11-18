const NYX = require("./client/NYX");
const client = new NYX();
module.exports = client;
process.on("unhandledRejection", err => {
  console.log(err);
});
client.start();
