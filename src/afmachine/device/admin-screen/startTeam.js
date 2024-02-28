function startTeam({ timestamp = Date.now(), teamName } = {}) {
  return this.mqtt.publish("team/start", { timestamp, teamName });
}

export { startTeam };
