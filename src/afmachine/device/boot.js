function boot() {
  return this.publish("boot", {
    timestamp: Date.now(),
    deviceId: this.deviceId,
    deviceType: this.deviceType,
    roomName: this.roomName,
  }).then((res) => {
    console.log(`Device ${this.deviceType} booted -> ${this.deviceId}`);
    return res;
  });
}

export { boot };
