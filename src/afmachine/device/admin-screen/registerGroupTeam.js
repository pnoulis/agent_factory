function registerGroupTeam({
  timestamp = Date.now(),
  teamName,
  groupPlayers,
} = {}) {
  return this.publish("group/register", { timestamp, teamName, groupPlayers });
}

export { registerGroupTeam };
