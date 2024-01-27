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

  pair() {
    return this.wristband;
  }
  paired(wristband) {
    return this.wristband.normalize(wristband, { state: "paired" });
  }
  unpair() {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_CANCELS_OUT,
    )("Wristband is pairing");
  }
  unpaired(wristband) {
    this.wristband.throwStateErr(
      this.wristband.errCodes.EWRISTBAND_STATE_IMPOSSIBLE,
    )("Unpaired wristband in pairing state", this.wristband, wristband);
  }
}

export { Pairing };
