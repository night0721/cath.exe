const mongoose = require("mongoose");
module.exports = mongoose.model(
  "level",
  new mongoose.Schema({
    xp: Number,
    level: Number,
    lastUpdate: Date,
    userID: String,
    guildID: String,
  })
);
