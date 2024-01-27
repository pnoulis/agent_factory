function deregisterWristband({
  timestamp = "",
  username = "",
  wristbandNumber = "",
} = {}) {
  return this.publish("wristband/deregister", {
    timestamp,
    username,
    wristbandNumber,
  });
}

export { deregisterWristband };
