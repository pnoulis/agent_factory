class Pairing {
  static name = "pairing";
  static order = 1;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Pairing.name;
  }

  get order() {
    return Pairing.order;
  }

  pair() {
    return this;
  }
  paired() {
    return this.wristband.setState("paired");
  }
  unpair() {
    return this.setState("unpairing");
  }
  unpaired() {
    this.wristband.throwStateErr("unpaired", true);
  }
}

export { Pairing };
