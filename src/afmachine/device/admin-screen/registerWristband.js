function registerWristband({
  timestamp = Date.now(),
  username,
  wristbandNumber,
} = {}) {
  return this.mqtt.publish("wristband/register", {
    timestamp,
    username,
    wristbandNumber,
  });
}

export { registerWristband };
