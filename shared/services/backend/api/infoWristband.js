/**
 * Successful info wristband payload
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {Object} wristband
 * @property {number} wristband.wristbandNumber
 * @property {number} wristband.wristbandColor
 * @property {boolean} wristband.active
 */

/**
 * Failed info wristband payload
 *
 * @typedef {Object} FailurePayload
 * @property {string} result - NOK
 */

/**
 * Info wristband
 *
 * @param {Object} payload
 * @param {number} payload.wristbandNumber
 * @returns {Promise} SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 **/

function infoWristband(payload) {
  return this.publish("/wristband/info", payload);
}

export { infoWristband };
