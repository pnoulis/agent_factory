/**
 * Successful wristband registration payload.
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {string} message - successfull registered...
 *
 */

/**
 * Failed wristband registration payload.
 *
 * @typedef {Object} FailurePayload
 * @property {string} result - NOK
 */

/**
 * Register wristband
 *
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.wristbandNumber
 *
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 */
function registerWristband(payload) {
  return this.publish("/wristband/register", payload);
}

export { registerWristband };
