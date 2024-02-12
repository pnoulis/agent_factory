function listPlayers({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/players", { timestamp });
}

export { listPlayers };
