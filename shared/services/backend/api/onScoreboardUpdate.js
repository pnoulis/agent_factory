function onScoreboardUpdate(listener) {
  return this.subscribe("/scoreboard/updates", listener, {
    mode: "persistent",
  });
}

export { onScoreboardUpdate };
