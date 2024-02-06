function listScoreboard({ timestamp = Date.now() } = {}) {
  return this.publish("list/scoreboard", { timestamp });
}

export { listScoreboard };
