function startSession({ jwt } = {}) {
  return this.mqtt.publish("session/start", { jwt });
}

export { startSession };
