function listScoreboardViews() {
  return this.publish("/scoreboard/devices/views/get", {
    timestamp: Date.now(),
  });
}

export { listScoreboardViews };
