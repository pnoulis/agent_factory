function stopSession({ jwt, comment } = {}) {
  return this.publish("session/stop", { jwt, comment });
}

export { stopSession };
