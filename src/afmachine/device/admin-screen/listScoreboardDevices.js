function listScoreboardDevices({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/devices/scoreboard", { timestamp });
}

export { listScoreboardDevices };
