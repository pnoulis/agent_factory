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
    return new Promise(async (resolve, reject) => {
      this.pairing.resolve = resolve;
      this.pairing.reject = reject;
      try {
        const wristband = await this.scan();
        const isFree = await this.isWristbandFree();
        if (!isFree) {
          throw globalThis.craterr(({ EWRISTBAND }) =>
            EWRISTBAND("Scanned wristband is already paired!"),
          );
        }
        this.state.paired(wristband);
        resolve(this);
      } catch (err) {
        // this.state.unpaired(this);
        reject(err);
      } finally {
        this.pairing = null;
      }
    });
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
