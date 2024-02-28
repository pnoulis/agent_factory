function stopSession({ jwt, comment } = {}) {
  return this.mqtt.publish("session/stop", { jwt, comment });
}

export { stopSession };
