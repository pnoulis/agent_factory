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
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Wristband is unpairing"),
    );
  }
  paired(wristband) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND("Paired wristband in unpairing state"),
    );
  }
  unpair() {
    return this.wristband;
  }
  unpaired(wristband) {
    return this.wristband.normalize(
      {},
      { state: "unpaired", nullSupersede: true },
    );
  }
}

export { Unpairing };
