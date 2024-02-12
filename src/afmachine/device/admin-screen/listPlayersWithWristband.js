function listPlayersWithWristband({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/playersWithWristband", { timestamp });
}

export { listPlayersWithWristband };
