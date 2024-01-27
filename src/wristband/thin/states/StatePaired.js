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

  pair() {
    return this.wristband;
  }
  paired(wristband) {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_IMPOSSIBLE,
    )("Paired wristband in paired state", this.wristband, wristband);
  }
  unpair() {
    return this.wristband.setState("unpairing");
  }
  unpaired(wristband) {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_IMPOSSIBLE,
    )("Unpaired wristband in paired state", this.wristband, wristband);
  }
}

export { Paired };
