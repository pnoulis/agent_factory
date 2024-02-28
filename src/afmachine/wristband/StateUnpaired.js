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
  paired(wristband) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Paired a wristband in unpaired state"),
    );
  }
  unpair() {
    return this.wristband;
  }
  unpaired(wristband) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Unpaired wristband in unpaired state"),
    );
  }
}

export { Unpaired };
