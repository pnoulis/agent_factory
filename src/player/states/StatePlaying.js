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
  this.player.throwStateErr("register");
};
Playing.prototype.registered = function (player) {
  this.player.throwStateErr("registered", true, player);
};
Playing.prototype.pairWristband = function () {
  this.player.throwStateErr("pair a wristband to");
};
Playing.prototype.unpairWristband = function () {
  this.player.throwStateErr("unpair a wristband from");
};

export { Playing };
