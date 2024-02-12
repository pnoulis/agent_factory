function listDevices({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/devices", { timestamp });
}

export { listDevices };
