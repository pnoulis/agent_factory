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

export { Playing };
