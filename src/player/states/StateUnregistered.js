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
  return this;
};
Unregistered.prototype.registered = function (player) {
  return this.player.setState("registered");
};
Unregistered.prototype.pairWristband = function () {
  return this;
};
Unregistered.prototype.unpairWristband = function () {
  return this;
};

export { Unregistered };
