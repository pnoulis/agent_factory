class Playing {
  static name = "playing";
  static order = 2;

  constructor(pkg) {
    this.pkg = pkg;
  }

  get name() {
    return Playing.name;
  }

  get order() {
    return Playing.order;
  }
}

export { Playing };
