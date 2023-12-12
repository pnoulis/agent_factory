class Empty {
  static name = "empty";
  static order = 0;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Empty.name;
  }

  get order() {
    return Empty.order;
  }
}

export { Empty };
