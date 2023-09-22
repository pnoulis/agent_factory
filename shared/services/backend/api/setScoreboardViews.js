function setScoreboardViews({ deviceId = "", view = "" } = {}) {
  return this.publish("/scoreboard/devices/views/set", {
    timestamp: Date.now(),
    deviceId: deviceId || this.id,
    status: "ROTATING",
  });
}

export { setScoreboardViews };
