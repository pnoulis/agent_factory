function listScoreboardDevices() {
  return this.publish("/scoreboard/devices", { timestamp: Date.now() });
}

export { listScoreboardDevices };
