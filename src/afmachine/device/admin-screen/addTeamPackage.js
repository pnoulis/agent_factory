function addTeamPackage({ timestamp = Date.now(), teamName, name } = {}) {
  return this.publish("team/package/add", {
    timestamp,
    teamName,
    name,
  });
}

export { addTeamPackage };
