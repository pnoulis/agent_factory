function readWristband({
  timestamp = Date.now(),
  wristbandNumber,
  wristbandColor,
} = {}) {
  return this.mqtt.publish("read", {
    timestamp,
    wristbandNumber,
    wristbandColor,
  });
}

export { readWristband };
