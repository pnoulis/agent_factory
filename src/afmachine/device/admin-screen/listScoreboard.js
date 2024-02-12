function listScoreboard({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/scoreboard", { timestamp });
}

export { listScoreboard };
