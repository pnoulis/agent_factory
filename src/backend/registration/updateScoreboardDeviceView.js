function updateScoreboardDeviceView({
  timestamp = Date.now(),
  deviceId,
  status,
} = {}) {
  return this.publish("device/scoreboard/view/update", {
    timestamp,
    deviceId,
    status,
  });
}

export { updateScoreboardDeviceView };
