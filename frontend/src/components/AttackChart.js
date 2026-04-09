import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function AttackChart({ logs }) {
  const data = logs.map((log, index) => ({
    name: index,
    requests: log.request_count
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📈 Attack Activity</h3>

      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="requests" />
      </LineChart>
    </div>
  );
}