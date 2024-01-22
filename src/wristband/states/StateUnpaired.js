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
    throw new Error("Wristband is not in pairing mode");
  }
  unpair() {
    throw new Error("Wristband is already unpaired");
  }
  toggle() {
    this.setState("pairing");
    return this.wristband.scan();
  }
}

export { Unpaired };
