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

  pair(wristband) {
    throw new Error(`Trying to pair a wristband in paired state`);
  }
  unpair() {
    throw new Error("Trying to unpair a wristband in paired state");
  }
  unsubscribe(unsub) {
    unsub();
    this.wristband.unsubscribe = null;
  }
  toggle() {
    if (this.wristband.unsubscribe) {
      this.unsubscribe();
    }
    this.wristband.setState("unpairing");
    this.wristband.unpair();
  }
}

export { Paired };
