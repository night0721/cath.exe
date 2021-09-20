const mongoose = require("mongoose");
const prefix = require("../config.json").prefix;
module.exports = mongoose.model(
  "guild",
  new mongoose.Schema({
    Guild: String,
    Prefix: {
      type: String,
      default: prefix,
    },
    Welcome: {
      type: String,
      default: "null",
    },
    Goodbye: {
      type: String,
      default: "null",
    },
    Log: { type: String, default: "null" },
    LogWebhookID: { type: String, default: "null" },
    LogWebhookToken: { type: String, default: "null" },
    Starboard: {
      type: String,
      default: "null",
    },
    StarCount: {
      type: Number,
      default: 0,
    },
    Muterole: {
      type: String,
      default: "null",
    },
    Chatbot: {
      type: String,
      default: "null",
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
    Level: {
      type: Boolean,
      default: false,
    },
  })
);
