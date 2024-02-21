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
    return this.wristband;
  }
  paired(wristband) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Paired wristband in paired state"),
    );
  }
  unpair() {
    return this.wristband;
    // return this.wristband.setState("unpairing");
  }
  unpaired(wristband) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Unpaired wristband in paired state"),
    );
  }
}

export { Paired };
