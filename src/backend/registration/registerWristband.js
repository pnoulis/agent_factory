function registerWristband({
  timestamp = Date.now(),
  username,
  wristbandNumber,
} = {}) {
  return this.publish("wristband/register", {
    timestamp,
    username,
    wristbandNumber,
  });
}

export { registerWristband };
