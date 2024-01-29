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
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to register a player in playing state",
  );
};
Playing.prototype.registered = function (player) {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE_IMPOSSIBLE)(
    "Registered a player in playing state",
    player,
  );
};
Playing.prototype.pairWristband = function () {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to pair a player's wristband in playing state",
  );
};
Playing.prototype.unpairWristband = function () {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to unpair a player's wristband in playing state",
  );
};

export { Playing };
