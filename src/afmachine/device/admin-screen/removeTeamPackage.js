function removeTeamPackage({
  timestamp = Date.now(),
  teamName,
  packageId,
} = {}) {
  return this.mqtt.publish("team/package/remove", {
    timestamp,
    teamName,
    packageId,
  });
}

export { removeTeamPackage };
