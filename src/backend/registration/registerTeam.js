function registerTeam({ timestamp = Date.now(), teamName, usernames } = {}) {
  return this.publish("/team/register", { timestamp, teamName, usernames });
}

export { registerTeam };
