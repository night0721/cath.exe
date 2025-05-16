const mongoose = require("mongoose");
const prefix = require("../config").prefix;
module.exports = mongoose.model(
  "guild",
  new mongoose.Schema({
    Guild: String,
    Prefix: {
      type: String,
      default: prefix,
    },
    Premium: {
      type: Boolean,
      default: false,
    },
    Category: {
      type: Array,
      default: [],
    },
    Commands: {
      type: Array,
      default: [],
    },
    Tips: {
      type: Boolean,
      default: true,
    },
  })
);
