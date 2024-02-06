function listDevices({ timestamp = Date.now() } = {}) {
  return this.publish("list/devices", { timestamp });
}

export { listDevices };
