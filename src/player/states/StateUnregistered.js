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
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to pair a player's wristband  in unregistered state",
  );
};
Unregistered.prototype.unpairWristband = function () {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to unpair a player's wristband in unregistered state",
  );
};

export { Unregistered };
