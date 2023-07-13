import * as Errors from "../../../errors.js";
/**
 * Wristband scan listener callback
 * @typedef ScanListenerCallback
 * @param {error} error
 * @param {Object} backendWristband
 * @param {number} backendWristband.wristbandNumber
 * @param {number} backendWristband.wristbandColor
 */

/**
 * Subscribe wristband scan
 *
 * @param {ScanListenerCallback} listener - Message handler
 * @param {Object} options
 * @param {string} options.mode - If persistent keep the channel
 * open until unsubscription.
 * @returns {Promise<UnsubscribeFn>}
 * @throws {TimeoutError}
 */

function getWristbandScan(unsubcb) {
  return new Promise((resolve, reject) => {
    this.subscribe(
      "/wristband/scan",
      (unsubed, err, wristband) => {
        if (unsubed) {
          reject(new Errors.ERR_UNSUBSCRIBED());
        } else if (err) {
          reject(err);
        } else {
          resolve(wristband);
        }
      },
      { mode: "response" },
    )
      .then(unsubcb)
      .catch(reject);
  }).catch((err) => {
    throw err;
  });
}

function onWristbandScan(listener) {
  return this.subscribe("/wristband/scan", listener, { mode: "persistent" });
}

function onceWristbandScan(listener) {
  return this.subscribe("/wristband/scan", listener, { mode: "response" });
}

export { getWristbandScan, onWristbandScan, onceWristbandScan };
