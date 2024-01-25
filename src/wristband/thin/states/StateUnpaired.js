class Unpaired {
  static name = "unpaired";
  static order = 0;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Unpaired.name;
  }

  get order() {
    return Unpaired.order;
  }

  pair() {
    return this.wristband.setState("pairing");
  }
  paired() {
    this.wristband.throwStateErr("paired", true);
  }
  unpair() {
    return this;
  }
  unpaired() {
    this.wristband.throwStateErr("unpaired", true);
  }
}

export { Unpaired };
