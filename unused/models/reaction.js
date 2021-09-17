const mongoose = require("mongoose");

module.exports = mongoose.model(
  "reaction-roles",
  new mongoose.Schema({
    Guild: String,
    Message: String,
    Roles: Object,
  })
);
