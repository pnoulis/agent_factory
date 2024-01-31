function listScoreboardDevices({ timestamp = Date.now() } = {}) {
  return this.publish("list/scoreboard/devices", { timestamp });
}

export { listScoreboardDevices };
