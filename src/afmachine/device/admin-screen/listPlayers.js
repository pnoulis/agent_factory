function listPlayers({ timestamp = Date.now() } = {}) {
  return this.publish("list/players", { timestamp });
}

export { listPlayers };
