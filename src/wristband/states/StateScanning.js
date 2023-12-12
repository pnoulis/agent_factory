class Scanning {
  static name = "scanning";
  static order = 1;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Scanning.name;
  }

  get order() {
    return Scanning.order;
  }
}

export { Scanning };
