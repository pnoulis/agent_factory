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

  pair() {
    return this.wristband.setState("pairing");
  }
  paired(wristband) {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_IMPOSSIBLE,
    )("Paired a wristband in unpaired state", this.wristband, wristband);
  }
  unpair() {
    return this.wristband.normalize(
      {},
      { state: "unpaired", nullSupersede: true },
    );
  }
  unpaired(wristband) {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_IMPOSSIBLE,
    )("Unpaired wristband in unpaired state", this.wristband, wristband);
  }
}

export { Unpaired };
