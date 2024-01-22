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
  pair(wristband) {
    throw new Error(`Trying to pair a wristband in unpairing state`);
  }
  unpair() {
    this.wristband.normalize();
    this.wristband.setState("unpaired");
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

export { Unpairing };
