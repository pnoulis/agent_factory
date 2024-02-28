class Paused {
  static name = "paused";
  static order = 3;

  constructor(pkg) {
    this.pkg = pkg;
  }

  get name() {
    return Paused.name;
  }

  get order() {
    return Paused.order;
  }
}

export { Paused };
