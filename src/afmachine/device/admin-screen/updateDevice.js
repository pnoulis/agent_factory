function updateDevice({
  timestamp = Date.now(),
  deviceId,
  devicesAction,
} = {}) {
  return this.publish("devices/update", {
    timestamp,
    devicesAction,
    deviceId,
  });
}

export { updateDevice };
