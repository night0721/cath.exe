const mongoose = require("mongoose");
module.exports = mongoose.model(
  "economy",
  new mongoose.Schema({
    User: {
      type: String,
      required: true,
    },
    CP: {
      type: Number,
      default: 0,
    },
    BJWins: {
      type: Number,
      default: 0,
    },
    SlotsWins: {
      type: Number,
      default: 0,
    },
    BetWins: {
      type: Number,
      default: 0,
    },
    Inventory: {
      NA45: { type: Number, default: 0 },
      Deagle: { type: Number, default: 0 },
      MantaRay: { type: Number, default: 0 },
      Alias: { type: Number, default: 0 },
      Scylla: { type: Number, default: 0 },
      UrbanTracker: { type: Number, default: 0 },
      EpicXPCard: { type: Number, default: 0 },
    },
    Gun: {
      Name: { type: String, default: "" },
      Rank: { type: String, default: "Iron" },
      Kills: { type: Number, default: 0 },
      XP: { type: Number, default: 0 },
      Level: { type: Number, default: 1 },
    },
  })
);
