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
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to register a player in registered state",
  );
};
Registered.prototype.registered = function (player) {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE_IMPOSSIBLE)(
    "Registered a player in registered state",
    player,
  );
};
Registered.prototype.pairWristband = function () {
  return this.player;
};
Registered.prototype.unpairWristband = function () {
  return this.player;
};

export { Registered };
