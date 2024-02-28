function updateScoreboardDeviceView({
  timestamp = Date.now(),
  deviceId,
  status,
} = {}) {
  return this.mqtt.publish("device/scoreboard/view/update", {
    timestamp,
    deviceId,
    status,
  });
}

export { updateScoreboardDeviceView };
