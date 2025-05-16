const mongoose = require("mongoose");
module.exports = mongoose.model(
  "user",
  new mongoose.Schema({
    User: String,
    Tier: {
      type: Number,
      default: 0,
    },
    Premium: {
      type: Boolean,
      default: false,
    },
    Blacklist: {
      type: Boolean,
      default: false,
    },
    Blacklist_Reason: {
      type: String,
      default: "null",
    },
    PremiumServers: {
      type: Array,
      default: [],
    },
    CommandUsed: {
      type: Number,
      default: 0,
    },
  })
);
