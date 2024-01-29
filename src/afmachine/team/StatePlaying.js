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

export { Playing };
