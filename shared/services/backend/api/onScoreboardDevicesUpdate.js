function onScoreboardDevicesUpdate(listener) {
  return this.subscribe("/scoreboard/devices/updates", listener, {
    mode: "persistent",
  });
}

export { onScoreboardDevicesUpdate };
