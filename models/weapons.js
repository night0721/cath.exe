// Do we still need this ?

const mongoose = require("mongoose");
module.exports = mongoose.model(
  "weapons",
  new mongoose.Schema({
    Categories: {
      type: Array,
      default: [],
    },
    Primary: {
      type: Array,
      default: [],
    },
    Secondary: {
      type: Array,
      default: [],
    },
    Equipment: {
      type: Array,
      default: [],
    },
    OperatorSkill: {
      type: Array,
      default: [],
    },
    Perk: {
      type: Array,
      default: [],
    },
  })
);
