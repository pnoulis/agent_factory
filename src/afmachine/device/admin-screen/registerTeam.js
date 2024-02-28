function registerTeam({ timestamp = Date.now(), teamName, usernames } = {}) {
  return this.mqtt.publish("/team/register", { timestamp, teamName, usernames });
}

export { registerTeam };
