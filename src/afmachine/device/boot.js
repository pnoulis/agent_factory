function boot({ timestamp = Date.now(), deviceId, deviceType, roomName } = {}) {
  return this.mqtt.publish("boot", {
    timestamp,
    deviceId,
    deviceType,
    roomName,
  });
}

export { boot };
