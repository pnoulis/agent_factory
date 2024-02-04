function listScoreboardDevices({ timestamp = Date.now() } = {}) {
  return this.publish("list/devices/scoreboard", { timestamp });
}

export { listScoreboardDevices };
