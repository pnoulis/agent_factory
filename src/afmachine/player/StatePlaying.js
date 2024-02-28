class Playing {
  static name = "playing";
  static order = 3;

  constructor(player) {
    this.player = player;
  }

  get order() {
    return Playing.order;
  }

  get name() {
    return Playing.name;
  }
}

Playing.prototype.register = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to register a player in playing state"),
  );
};
Playing.prototype.registered = function (player) {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Registered a player in playing state"),
  );
};
Playing.prototype.pairWristband = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to pair a players wristband in playing state"),
  );
};
Playing.prototype.unpairWristband = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to unpair a players wristband in playing state"),
  );
};

export { Playing };
