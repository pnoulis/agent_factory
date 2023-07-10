function listRegisteredPlayers(payload) {
  return this.publish("/players/list", payload);
}

export { listRegisteredPlayers };
