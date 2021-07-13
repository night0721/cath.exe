const express = require("express");
const app = express();
const route1 = require("./api/api");
const cors = require("cors");
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use("/api", route1);
app.use("/", async (req, res) => {
  res.send("");
});
app.listen(port, () => {
  console.log(`Listen on PORT ${port}`);
});
