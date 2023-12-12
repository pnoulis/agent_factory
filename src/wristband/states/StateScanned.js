class Scanned {
  static name = "scanned";
  static order = 2;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Scanned.name;
  }

  get order() {
    return Scanned.order;
  }
}

export { Scanned };
