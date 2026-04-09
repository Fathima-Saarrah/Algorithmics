const mongoose = require("mongoose");

const blockedSchema = new mongoose.Schema({
    ip: { type: String, unique: true },
    reason: String,
    blocked_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("BlockedIP", blockedSchema);