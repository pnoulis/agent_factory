function registerGroupTeam({
  timestamp = Date.now(),
  teamName,
  groupPlayers,
} = {}) {
  return this.mqtt.publish("group/register", { timestamp, teamName, groupPlayers });
}

export { registerGroupTeam };
