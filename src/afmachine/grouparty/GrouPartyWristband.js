import { WristbandCommander } from "../wristband/WristbandCommander.js";

class GrouPartyWristband extends WristbandCommander {
  constructor(wristband) {
    super(wristband);
  }

  async isWristbandFree() {
    const { wristband } = await parsecmd(
      afm.getWristbandInfo(this, { queue: false }),
    );
    return wristband.state === "unpaired";
  }

  async pair() {
    this.pairing = {};
    try {
      const wristband = await this.scan();
      const isFree = await this.isWristbandFree();
      if (!isFree) {
        throw globalThis.craterr(({ EWRISTBAND }) =>
          EWRISTBAND("Scanned wristband is already paired!"),
        );
      }
      this.state.paired(wristband);
    } catch (err) {
      this.setState("unpaired");
      throw err;
    } finally {
      this.pairing = null;
    }
  }
  async unpair() {
    try {
      this.cancelPairing();
      await Promise.resolve().then(() => this.state.unpaired(this));
    } finally {
      return this;
    }
  }
}

export { GrouPartyWristband };
