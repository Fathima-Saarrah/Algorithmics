export default function AlertBanner({ threat, logs }) {
  const attackLog = logs.find(l => l.ai?.isThreat);

  if (!threat) {
    return (
      <div style={{ background: "green", color: "white", padding: 10 }}>
        ✅ System Secure
      </div>
    );
  }

  return (
    <div style={{ background: "red", color: "white", padding: 10 }}>
      🚨 {attackLog?.ai.type} Detected with {attackLog?.ai.confidence} Confidence
      — Auto Blocking IP {attackLog?.ip}
    </div>
  );
}