function listRegisteredPlayers() {
  return this.publish("/players/list");
}

export { listRegisteredPlayers };
