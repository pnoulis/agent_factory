class Completed {
  static name = "completed";
  static order = 4;

  constructor(pkg) {
    this.pkg = pkg;
  }

  get name() {
    return Completed.name;
  }

  get order() {
    return Completed.order;
  }
}

export { Completed };
