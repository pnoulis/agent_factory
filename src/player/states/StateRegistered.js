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
  this.player.throwStateErr("register");
};
Registered.prototype.registered = function (player) {
  this.player.throwStateErr("registered", true, player);
};
Registered.prototype.pairWristband = function () {
  return this;
};
Registered.prototype.unpairWristband = function () {
  return this;
};

export { Registered };
