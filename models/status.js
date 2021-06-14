const mongoose = require("mongoose");
module.exports = mongoose.model(
  "status",
  new mongoose.Schema({
    Bot: {
      type: String,
      default: "null",
    },
    Status: { type: String, default: "false" },
  })
);
