function readWristband({
  timestamp = Date.now(),
  wristbandNumber,
  wristbandColor,
} = {}) {
  return this.mqtt.publish("read", {
    timestamp: Date.now(),
    wristbandNumber,
    wristbandColor,
  });
}

export { readWristband };
