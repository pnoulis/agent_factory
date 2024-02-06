function startTeam({ timestamp = Date.now(), teamName } = {}) {
  return this.publish("team/start", { timestamp, teamName });
}

export { startTeam };
