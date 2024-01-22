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

  pair(wristband) {
    throw new Error("Trying to pair a wristband in unpaired state");
  }
  unpair() {
    throw new Error("Trying to unpair a wristband in unpaired state");
  }
  unsubscribe(unsub) {
    unsub();
    this.wristband.unsubscribe = null;
  }
  toggle() {
    this.wristband.setState("pairing");
    this.wristband.pair();
  }
}

export { Unpaired };
