class Paired {
  static name = "paired";
  static order = 2;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Paired.name;
  }

  get order() {
    return Paired.order;
  }
}

export { Paired };
