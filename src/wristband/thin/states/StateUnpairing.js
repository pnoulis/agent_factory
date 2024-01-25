class Unpairing {
  static name = "unpairing";
  static order = 2;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Unpairing.name;
  }

  get order() {
    return Unpairing.order;
  }
  pair() {
    this.wristband.throwStateErr("pair");
  }
  paired() {
    this.wristband.throwStateErr("paired", true);
  }
  unpair() {
    return this;
  }
  unpaired() {
    return this.wristband.setState("unpaired");
  }
}

export { Unpairing };
