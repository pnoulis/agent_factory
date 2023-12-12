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

export { Registered };
