function deregisterWristband({
  timestamp = Date.now(),
  username,
  wristbandNumber,
} = {}) {
  return this.publish("wristband/deregister", {
    timestamp,
    username,
    wristbandNumber,
  });
}

export { deregisterWristband };
