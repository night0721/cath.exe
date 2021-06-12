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
      required: true,
    },
    Inventory: Object,
  })
);
