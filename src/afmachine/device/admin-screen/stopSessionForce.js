function stopSessionForce() {
  return this.mqtt.publish("session/stop/force");
}

export { stopSessionForce };
