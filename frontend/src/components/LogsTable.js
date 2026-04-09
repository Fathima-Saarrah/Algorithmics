export default function LogsTable({ logs }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📜 Live Logs</h3>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>IP</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Requests</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr
              key={index}
              style={{
                background: log.request_count > 10 ? "#ffcccc" : "white"
              }}
            >
              <td>{log.ip}</td>
              <td>{log.endpoint || "/login"}</td>
              <td>{log.status || "success"}</td>
              <td>{log.request_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}