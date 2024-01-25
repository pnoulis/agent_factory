class Paired {
  static name = "paired";
  static order = 3;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Paired.name;
  }

  get order() {
    return Paired.order;
  }

  pair() {
    return this;
  }
  paired() {
    this.wristband.throwStateErr("paired", true);
  }
  unpair() {
    return this.wristband.setState("unpairing");
  }
  unpaired() {
    this.wristband.throwStateErr("unpaired", true);
  }
}

export { Paired };
