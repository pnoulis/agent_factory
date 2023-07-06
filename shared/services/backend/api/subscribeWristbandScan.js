/**
 * Wristband scan listener callback
 * @callback wristbandScanListener
 * @param {error} error
 * @param {Object} backendWristband
 * @param {number} backendWristband.wristbandNumber
 * @param {number} backendWristband.wristbandColor
 */

/**
 * Subscribe wristband scan
 *
 * @param {wristbandScanListener} listener - Message handler
 * @param {Object} options
 * @param {string} options.mode - If persistent keep the channel
 * open until unsubscription.
 * @returns {Promise<SuccessfullSubscription>}
 * @throws {FailedSubscription}
 */

function subscribeWristbandScan(payload) {
  return this.subscribe(
    "/wristband/scan",
    payload.listener,
    payload.options || { mode: "persistent" }
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
