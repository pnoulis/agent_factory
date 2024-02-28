class Unregistered {
  static name = "unregistered";
  static order = 0;

  constructor(team) {
    this.team = team;
  }

  get name() {
    return Unregistered.name;
  }

  get order() {
    return Unregistered.order;
  }
}

Unregistered.prototype.register = function () {
  return this.team;
};

Unregistered.prototype.registered = function (team) {
  return this.team.normalize(team, { state: "registered" });
};

export { Unregistered };
