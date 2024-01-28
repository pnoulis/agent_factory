class Unregistered {
  static name = "unregistered";
  static order = 0;

  constructor(pkg) {
    this.pkg = pkg;
  }

  get name() {
    return Unregistered.name;
  }

  get order() {
    return Unregistered.order;
  }
}

export { Unregistered };
