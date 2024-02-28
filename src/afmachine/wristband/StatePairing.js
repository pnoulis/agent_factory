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
    return this.wristband;
  }
  paired(wristband) {
    return this.wristband.normalize(wristband, { state: "paired" });
  }
  unpair() {
    return this.wristband.setState("unpairing");
  }
  unpaired(wristband) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Unpaired wristband in pairing state"),
    );
  }
}

export { Pairing };
