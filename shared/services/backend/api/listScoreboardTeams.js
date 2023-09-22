function listScoreboardTeams() {
  return this.publish("/scoreboard/teams", { timestamp: Date.now() });
}

export { listScoreboardTeams };
