export default function AttackControls() {

  const simulateBruteForce = () => {
    console.log("Brute Force Attack Triggered");
  };

  const simulateSQL = () => {
    console.log("SQL Injection Triggered");
  };

  const buttonStyle = {
  padding: "10px 15px",
  background: "#333",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>🎮 Attack Control Panel</h3>

      <button
        onClick={simulateBruteForce}
        style={buttonStyle}
      >
        🔥 Simulate Brute Force
      </button>

      <button
        onClick={simulateSQL}
        style={{ ...buttonStyle, marginLeft: "10px" }}
      >
        💉 Simulate SQL Injection
      </button>
    </div>
  );
}

