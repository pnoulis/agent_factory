function listAllPlayers() {
  return this.publish("/players/list/all", {
    timestamp: Date.now(),
  });
}

export { listAllPlayers };
