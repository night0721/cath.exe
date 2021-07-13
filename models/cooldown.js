const { Schema, model } = require("mongoose");
module.exports = model(
  "cooldown",
  new Schema({
    User: {
      type: String,
      required: true,
    },
    CMD: {
      type: String,
      default: "",
    },
    Time: {
      type: Number,
      default: 0,
    },
    Cooldown: {
      type: Number,
      default: 0,
    },
  })
);
