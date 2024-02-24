class InTeam {
  static name = "inTeam";
  static order = 2;

  constructor(player) {
    this.player = player;
  }

  get order() {
    return InTeam.order;
  }

  get name() {
    return InTeam.name;
  }
}

InTeam.prototype.register = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to register a player in inTeam state"),
  );
};
InTeam.prototype.registered = function (player) {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Registered a player in inTeam state"),
  );
};
InTeam.prototype.pairWristband = function () {
  return this.player;
};
InTeam.prototype.unpairWristband = function () {
  return this.player;
};

export { InTeam };
