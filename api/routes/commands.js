const { cmds } = require("../../util/dist/cmds");
const commands = cmds();
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send(commands);
});
module.exports = router;
