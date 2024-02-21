class Registered {
  static name = "registered";
  static order = 1;

  constructor(player) {
    this.player = player;
  }

  get name() {
    return Registered.name;
  }

  get order() {
    return Registered.order;
  }
}

Registered.prototype.register = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to register a player in registered state"),
  );
};
Registered.prototype.registered = function (player) {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Registered a player in registered state"),
  );
};
Registered.prototype.pairWristband = function () {
  return this.player;
};
Registered.prototype.unpairWristband = function () {
  return this.player;
};

export { Registered };
