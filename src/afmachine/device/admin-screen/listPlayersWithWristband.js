function listPlayersWithWristband({ timestamp = Date.now() } = {}) {
  return this.publish("list/playersWithWristband", { timestamp });
}

export { listPlayersWithWristband };
