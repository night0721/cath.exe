const router = require("express").Router();
const cmds = require("./commands");
router.use("/commands", cmds);
module.exports = router;
