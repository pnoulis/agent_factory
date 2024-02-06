function startSession({ jwt } = {}) {
  return this.publish("session/start", { jwt });
}

export { startSession };
