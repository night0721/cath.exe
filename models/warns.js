const mongoose = require("mongoose");
module.exports = mongoose.model(
  "warn",
  new mongoose.Schema({
    Guild: String,
    User: String,
    Warns: {
      type: Array,
      default: [],
    },
  })
);
