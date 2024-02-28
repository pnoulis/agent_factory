function boot({ timestamp = Date.now(), deviceId, deviceType, roomName } = {}) {
  return this.mqtt.publish("boot", {
    timestamp: timestamp,
    deviceId: deviceId,
    deviceType: deviceType,
    roomName: roomName,
  });
}

export { boot };
