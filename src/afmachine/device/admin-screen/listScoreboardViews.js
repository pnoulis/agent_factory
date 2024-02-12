function listScoreboardViews({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/devices/scoreboard/views", { timestamp });
}

export { listScoreboardViews };
