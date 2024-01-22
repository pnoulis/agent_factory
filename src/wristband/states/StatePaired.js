class Paired {
  static name = "paired";
  static order = 2;

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
    throw new Error("Wristband is already paired");
  }
  unpair() {
    throw new Error("Impossible state");
  }
  toggle() {
    this.setState("unpairing");
    return this.wristband.unscan();
  }
}

export { Paired };
