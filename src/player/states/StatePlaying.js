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

Playing.prototype.pairWristband = function (cb) {
  this.player.notify(
    new Error(
      `Trying to pair ${this.username} player's wristband in playing state`,
      cb,
    ),
  );
};

Playing.prototype.unpairWristband = function (cb) {
  this.player.notify(
    new Error(
      `Trying to unpair ${this.username} player's wristband in playing state`,
      cb,
    ),
  );
};

Playing.prototype.register = function () {
  throw new Error("Trying to register a player in Playing state");
};
Playing.prototype.registered = function (player) {
  throw new Error("Trying to register a player in Playing state");
};

export { Playing };
