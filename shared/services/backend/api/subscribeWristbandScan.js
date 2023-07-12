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

function getWristbandScan() {
  return new Promise((resolve, reject) => {
    this.subscribe(
      "/wristband/scan",
      (err, wristband) => (err ? reject(err) : resolve(wristband)),
      { mode: "response" },
    ).catch(reject);
  });
}

function onWristbandScan(listener) {
  return this.subscribe("/wristband/scan", listener, { mode: "persistent" });
}

function onceWristbandScan(listener) {
  return this.subscribe("/wristband/scan", listener, { mode: "response" });
}

export { getWristbandScan, onWristbandScan, onceWristbandScan };
