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

function subscribeWristbandScan(listener, options) {
  return this.subscribe(
    "/wristband/scan",
    listener,
    options || { mode: "persistent" },
  );
}

// function getWristbandScan() {
//   return new Promise((resolve, reject) => {
//     subscribeWristbandScan({
//       listener: (err, wristband) => (err ? reject(err) : resolve(wristband)),
//       options: {
//         mode: "response",
//       },
//     }).catch(reject);
//   });
// }

export { subscribeWristbandScan };
