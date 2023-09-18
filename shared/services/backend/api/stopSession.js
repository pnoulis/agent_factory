function stopSession({ jwt, comments } = {}) {
  return this.publish("/session/stop", {
    jwt,
    comments,
  });
}

export { stopSession };
