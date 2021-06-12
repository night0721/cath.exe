const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    itemID: {
      type: Number,
    },
    itemName: {
      type: String,
    },
    itemWeapon: {
      type: String,
    },
    itemRarity: {
      type: String,
    },
    itemIMG: {
      type: String,
    },
  },
});

module.exports = mongoose.model("inventory", inventorySchema);
