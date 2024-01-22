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

export { Registered };
