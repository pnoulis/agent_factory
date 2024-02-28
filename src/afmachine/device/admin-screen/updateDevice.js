function updateDevice({
  timestamp = Date.now(),
  deviceId,
  devicesAction,
} = {}) {
  return this.mqtt.publish("devices/update", {
    timestamp,
    devicesAction,
    deviceId,
  });
}

export { updateDevice };
