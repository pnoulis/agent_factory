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

Unregistered.prototype.pairWristband = function (cb) {
  this.wristband.toggle(cb);
};

Unregistered.prototype.unpairWristband = function (cb) {
  this.wristband.toggle(cb);
};

export { Unregistered };
