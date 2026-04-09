import { useState, useEffect } from "react";
import AlertBanner from "../components/AlertBanner";
import StatsCards from "../components/StatsCards";
import AttackControls from "../components/AttackControls";
import LogsTable from "../components/LogsTable";
import BlockedIPs from "../components/BlockedIPs";
import AttackChart from "../components/AttackChart";
import { detectThreat } from "../ai/detection";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [blocked, setBlocked] = useState([]);

  // Temporary dummy (until backend ready)
  useEffect(() => {
    const sampleLogs = [
      {
        ip: "192.168.1.1",
        endpoint: "/home",
        status: "success",
        request_count: 2
      },
      {
        ip: "192.168.1.100",
        endpoint: "/login",
        status: "failed",
        request_count: 20,
        payload: "' OR 1=1 --"
      }
    ];

    const analyzed = sampleLogs.map(log => ({
      ...log,
      ai: detectThreat(log)
    }));

    setLogs(analyzed);

    // auto block (simulate response)
    const blockedIPs = analyzed
      .filter(l => l.ai.isThreat)
      .map(l => ({ ip: l.ip }));

    setBlocked(blockedIPs);
  }, []);

  const threat = logs.some(l => l.ai?.isThreat) ? "HIGH" : null;

  return (
    <div style={{ padding: 20 }}>
      <h1>🛡️ AI Cyber Range Dashboard</h1>

      <AlertBanner threat={threat} logs={logs} />

      <StatsCards logs={logs} blocked={blocked} />

      <AttackControls />

      <AttackChart logs={logs} />

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "70%" }}>
          <LogsTable logs={logs} />
        </div>

        <BlockedIPs blocked={blocked} />
      </div>
    </div>
  );
}