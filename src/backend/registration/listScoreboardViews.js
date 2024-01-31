function listScoreboardViews({ timestamp = Date.now() } = {}) {
  return this.publish("list/scoreboard/views", { timestamp });
}

export { listScoreboardViews };
