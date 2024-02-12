function getWristbandInfo({ timestamp = "", wristbandNumber = "" } = {}) {
  return this.mqtt.publish("wristband/info", {
    timestamp,
    wristbandNumber,
  });
}

export { getWristbandInfo };
