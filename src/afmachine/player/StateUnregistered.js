class Unregistered {
  static name = "unregistered";
  static order = 0;

  constructor(player) {
    this.player = player;
  }

  get name() {
    return Unregistered.name;
  }

  get order() {
    return Unregistered.order;
  }
}

Unregistered.prototype.register = function () {
  return this.player;
};
Unregistered.prototype.registered = function (player) {
  return this.player.normalize(player, { state: "registered" });
};
Unregistered.prototype.pairWristband = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to pair a players wristband in unregistered state"),
  );
};
Unregistered.prototype.unpairWristband = function () {
  throw globalThis.craterr(({ EPLAYER }) =>
    EPLAYER("Trying to unpair a players wristband in unregistered state"),
  );
};

export { Unregistered };
