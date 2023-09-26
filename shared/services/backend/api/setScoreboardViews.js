function setScoreboardViews({ deviceId = "", status = "" } = {}) {
  return this.publish("/scoreboard/devices/views/set", {
    timestamp: Date.now(),
    deviceId,
    status,
  });
}

export { setScoreboardViews };
