const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const Log = require("./models/logModel");
const BlockedIP = require("./models/blockedModel");
const detectThreat = require("./ai/detection");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Connect DB
connectDB();

// 🔹 Insert Log + AI Detection
async function insertLog(log) {
  try {
    await Log.create(log);

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

  } catch (error) {
    console.error("Error:", error);
  }
}

// 🔹 Simulations

app.post("/simulate/normal", async (req, res) => {
  const log = {
    ip: "192.168.1.2",
    endpoint: "/home",
    status: "success",
    request_count: 1
  };

  await insertLog(log);
  res.json({ message: "Normal traffic simulated" });
});

app.post("/simulate/bruteforce", async (req, res) => {
  const log = {
    ip: "192.168.1.100",
    endpoint: "/login",
    status: "failed",
    request_count: 20
  };

  await insertLog(log);
  res.json({ message: "Brute force simulated" });
});

app.post("/simulate/sqlinjection", async (req, res) => {
  const log = {
    ip: "192.168.1.50",
    endpoint: "/login",
    payload: "' OR 1=1 --",
    status: "failed",
    request_count: 1
  };

  await insertLog(log);
  res.json({ message: "SQL Injection simulated" });
});

// 🔹 Fetch APIs

app.get("/logs", async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 });
  res.json(logs);
});

app.get("/blocked", async (req, res) => {
  const blocked = await BlockedIP.find();
  res.json(blocked);
});

// 🔹 Start Server
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on port 5000");
});