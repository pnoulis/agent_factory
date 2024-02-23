class Registered {
  static name = "registered";
  static order = 1;

  constructor(team) {
    this.team = team;
  }

  get name() {
    return Registered.name;
  }

  get order() {
    return Registered.order;
  }
}

Registered.prototype.register = function () {
  throw globalThis.craterr(({ ETEAM }) =>
    ETEAM("Trying to register a team in registered state"),
  );
};

Registered.prototype.registered = function (team) {
  throw globalThis.craterr(({ ETEAM }) =>
    ETEAM("Registered a team in registered state"),
  );
};

export { Registered };
