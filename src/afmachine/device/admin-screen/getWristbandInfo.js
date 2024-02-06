function getWristbandInfo({ timestamp = "", wristbandNumber = "" } = {}) {
  return this.publish("wristband/info", {
    timestamp,
    wristbandNumber,
  });
}

export { getWristbandInfo };
