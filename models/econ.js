const { Schema, model } = require("mongoose");
module.exports = model(
  "economy",
  new Schema({
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
  })
);
