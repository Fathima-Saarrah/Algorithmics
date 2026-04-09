const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const detectThreat = require("./ai/detection");
// Models
const Log = require("./models/logModel");
const BlockedIP = require("./models/blockedModel");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Connect MongoDB
connectDB();


// =========================
// 🔥 CORE FUNCTION
// =========================
async function insertLog(log) {
  try {
    // ✅ Save log
    await Log.create(log);

    // =========================
    // 🧠 DETECTION LOGIC
    // =========================

    // 🚨 Brute Force Detection
    const result = detectThreat(log);

if (result.isThreat) {
  console.log(`⚠️ ${result.type} Detected:`, log.ip);

  await BlockedIP.updateOne(
    { ip: log.ip },
    {
      ip: log.ip,
      reason: `${result.type} (Confidence: ${result.confidence.toFixed(2)})`
    },
    { upsert: true }
  );
}
    // 🚨 SQL Injection Detection
    if (log.payload && log.payload.includes("OR 1=1")) {
      console.log("⚠️ SQL Injection Detected:", log.ip);

      await BlockedIP.create({
        ip: log.ip,
        reason: "SQL Injection Attack"
      }).catch(() => {});
    }

  } catch (error) {
    console.error("❌ Error inserting log:", error);
  }
}


// =========================
// 🎮 SIMULATION ROUTES
// =========================

// 🔹 Normal Traffic
app.post("/simulate/normal", async (req, res) => {
  const log = {
    ip: "192.168.1.2",
    endpoint: "/home",
    status: "success",
    request_count: 1
  };

  await insertLog(log);
  res.json({ message: "Normal traffic simulated", log });
});


// 🔹 Brute Force Attack
app.post("/simulate/bruteforce", async (req, res) => {
  const log = {
    ip: "192.168.1.100",
    endpoint: "/login",
    status: "failed",
    request_count: 20
  };

  await insertLog(log);
  res.json({ message: "Brute force simulated", log });
});


// 🔹 SQL Injection Attack
app.post("/simulate/sqlinjection", async (req, res) => {
  const log = {
    ip: "192.168.1.50",
    endpoint: "/login",
    payload: "' OR 1=1 --",
    status: "failed",
    request_count: 1
  };

  await insertLog(log);
  res.json({ message: "SQL Injection simulated", log });
});

// 📊 Get all logs
app.get("/logs", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

// 🚫 Get blocked IPs
app.get("/blocked", async (req, res) => {
  try {
    const blocked = await BlockedIP.find().sort({ blockedAt: -1 });
    res.json(blocked);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blocked IPs" });
  }
});


// =========================
// 🚀 START SERVER
// =========================
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on network");
});