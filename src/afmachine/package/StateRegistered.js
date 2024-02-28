class Registered {
  static name = "registered";
  static order = 1;

  constructor(pkg) {
    this.pkg = pkg;
  }

  get name() {
    return Registered.name;
  }

  get order() {
    return Registered.order;
  }
}

export { Registered };
