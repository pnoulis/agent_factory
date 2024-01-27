function registerWristband({
  timestamp = "",
  username = "",
  wristbandNumber = "",
} = {}) {
  return this.publish("wristband/register", {
    timestamp,
    username,
    wristbandNumber,
  });
}

export { registerWristband };
