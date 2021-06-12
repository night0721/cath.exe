const mongoose = require("mongoose");
module.exports = mongoose.model(
  "user",
  new mongoose.Schema({
    User: String,
    AFK: {
      type: String,
      default: null,
    },
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
  })
);
