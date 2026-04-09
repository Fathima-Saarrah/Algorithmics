function detectThreat(log) {
  const weights = {
    frequency: 0.5,
    payload: 0.8,
    errorRate: 0.3
  };

  let f1 = Math.min(log.request_count / 15, 1);

  let f2 =
    log.payload &&
    (log.payload.includes("'") || log.payload.includes("--"))
      ? 1
      : 0;

  let f3 = log.status === "failed" ? 1 : 0;

  let probability =
    f1 * weights.frequency +
    f2 * weights.payload +
    f3 * weights.errorRate;

  const confidence = Math.min(probability, 1);
  const isThreat = confidence > 0.65;

  let type = "Normal";

  if (isThreat) {
    if (f2 > 0.5) type = "SQL Injection";
    else if (f1 > 0.7) type = "Brute Force";
    else type = "Anomalous Activity";
  }

  return { isThreat, confidence, type };
}

module.exports = detectThreat;