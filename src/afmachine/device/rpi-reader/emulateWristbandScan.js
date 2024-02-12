function emulateWristbandScan({ id, color }) {
  return this.mqtt.publish("read", {
    timestamp: Date.now(),
    wristbandNumber: id,
    wristbandColor: color,
  });
}

export { emulateWristbandScan };
