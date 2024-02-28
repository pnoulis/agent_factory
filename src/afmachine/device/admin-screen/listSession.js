function listSession() {
  return this.mqtt.publish("session");
}

export { listSession };
