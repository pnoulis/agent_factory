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
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_CANCELS_OUT,
    )("Wristband is unpairing");
  }
  paired(wristband) {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_IMPOSSIBLE,
    )("Paired wristband in unpairing state", this.wristband, wristband);
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
