const mongoose = require("mongoose");

const blockedSchema = new mongoose.Schema({
  ip: { type: String, unique: true },
  reason: String
}, { timestamps: true });

module.exports = mongoose.model("BlockedIP", blockedSchema);