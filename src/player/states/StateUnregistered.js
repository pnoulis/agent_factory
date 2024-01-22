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

Unregistered.prototype.register = async function (afm) {
  const p = backend.registerPlayer(this);
};

export { Unregistered };
