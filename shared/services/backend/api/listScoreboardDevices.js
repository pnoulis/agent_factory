function listScoreboardDevices() {
  return this.publish("/scoreboard/devices", { timestamp: Date.now() });
}

function onScoreboardDevicesUpdate(listener) {
  return this.subscribe("/scoreboard/devices", listener, {
    mode: "persistent",
  });
}

export { listScoreboardDevices, onScoreboardDevicesUpdate };
