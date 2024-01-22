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
    return this;
  }
  unpair() {
    return this.wristband.unscan();
  }
  toggle() {
    this.setState("unpairing");
    return this.wristband.unscan();
  }
}

export { Pairing };
