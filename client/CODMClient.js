const { CODMClient } = require("cath");
module.exports = new CODMClient(process.env.CODM_API_KEY);
