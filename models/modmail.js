const mongoose = require("mongoose");

module.exports = mongoose.model(
  "modmail",
  new mongoose.Schema({
    Guild: String,
    Category: String,
    Choices: Object,
    Role: String,
  })
);
