function listDevices() {
  return this.publish("/devices", { timestamp: Date.now() });
}

export { listDevices };
