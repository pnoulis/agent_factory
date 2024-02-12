function deregisterWristband({
  timestamp = Date.now(),
  username,
  wristbandNumber,
} = {}) {
  return this.mqtt.publish("wristband/deregister", {
    timestamp,
    username,
    wristbandNumber,
  });
}

export { deregisterWristband };
