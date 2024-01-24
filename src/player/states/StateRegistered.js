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

Registered.prototype.pairWristband = function () {
  this.wristband.toggle(cb);
};
Registered.prototype.unpairWristband = function () {
  this.wristband.toggle(cb);
};
Registered.prototype.register = function () {
  throw new Error("Trying to register a player in registered state");
};
Registered.prototype.registered = function (player) {
  throw new Error("Trying to register a player in registered state");
};

export { Registered };
