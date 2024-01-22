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
  pair(wristband) {
    this.wristband.normalize(wristband);
    this.wristband.setState("paired");
  }
  unpair() {
    throw new Error("Trying to unpair a wristband in pairing state");
  }
  unsubscribe(unsub) {
    this.unsubscribe = unsub;
  }
  toggle() {
    if (this.wristband.unsubscribe) {
      this.wristband.unsubscribe();
    }
    this.wristband.setState("unpairing");
    this.wristband.unpair();
  }
}

export { Pairing };
