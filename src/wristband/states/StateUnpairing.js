class Unpairing {
  static name = "unpairing";
  static order = 4;

  constructor(wristband) {
    this.wristband = wristband;
  }

  get name() {
    return Unpairing.name;
  }

  get order() {
    return Unpairing.order;
  }
  pair(wristband) {}
  unpair() {
    this.wristband.normalize();
    this.wristband.setState("unpaired");
    return this;
  }
  toggle() {
    this.setState("pairing");
    return this.wristband.scan();
  }
}
