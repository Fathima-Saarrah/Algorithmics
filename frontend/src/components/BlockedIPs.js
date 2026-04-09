export default function BlockedIPs({ blocked }) {
  return (
    <div style={{ marginTop: "20px", width: "30%" }}>
      <h3>🚫 Blocked IPs</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {blocked.length === 0 && <p>No blocked IPs</p>}

        {blocked.map((b, index) => (
          <li
            key={index}
            style={{
              background: "#ffe6e6",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            <strong>{b.ip}</strong>
            <br />
            <small>Blocked due to suspicious activity</small>
          </li>
        ))}
      </ul>
    </div>
  );
}