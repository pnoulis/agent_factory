function listScoreboardViews({ timestamp = Date.now() } = {}) {
  return this.publish("list/devices/scoreboard/views", { timestamp });
}

export { listScoreboardViews };
