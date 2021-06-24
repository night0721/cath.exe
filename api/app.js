const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes/routes");
const client = require("../bot");
client.on("ready", async () => {
  var users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  var guilds = client.guilds.cache.size;
  const caches = {
    users: users,
    guilds: guilds,
  };
  app.use("/api", routes);
  app.use("/client", async (req, res) => {
    res.status(200).send(caches);
  });
  app.listen(port, () => {
    console.log(`Listen on PORT ${port}`);
  });
});
