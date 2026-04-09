export default function StatsCards({ logs, blocked }) {
  const totalRequests = logs.length;
  const threats = logs.filter(l => l.request_count > 10).length;
  const blockedCount = blocked.length;

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      margin: "20px 0"
    }}>
      
      <div style={cardStyle}>
        <h3>📊 Requests</h3>
        <p>{totalRequests}</p>
      </div>

      <div style={cardStyle}>
        <h3>🚨 Threats</h3>
        <p>{threats}</p>
      </div>

      <div style={cardStyle}>
        <h3>🚫 Blocked IPs</h3>
        <p>{blockedCount}</p>
      </div>

    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  width: "150px",
  textAlign: "center",
  borderRadius: "8px",
  background: "#f9f9f9"
};