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

Unregistered.prototype.pairWristband = function () {
  return this.player;
};
Unregistered.prototype.unpairWristband = function () {
  return this.player;
};

export { Unregistered };
