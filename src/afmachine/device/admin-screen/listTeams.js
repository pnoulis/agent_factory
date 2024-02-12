function listTeams() {
  return this.mqtt.publish("list/teams");
}

export { listTeams };
