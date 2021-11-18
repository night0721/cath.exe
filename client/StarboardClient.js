const { StarboardClient } = require("cath");
const client = require("..");
module.exports = new StarboardClient({
  client,
  color: client.color,
});
