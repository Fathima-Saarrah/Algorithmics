const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    ip: String,
    endpoint: String,
    status: String,
    payload: String,
    request_count: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Log", logSchema);