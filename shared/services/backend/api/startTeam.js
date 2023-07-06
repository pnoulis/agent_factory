/**
 * Successful team start payload
 *
 * @typedef {Object} SuccessPayload
 *
 */

/**
 * Failed team start payload
 *
 * @typedef {Object} FailurePayload
 *
 */

/**
 * Start team
 *
 * @param {Object} payload
 * @param {string} payload.teamname
 * @returns {Promise} SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 **/

function startTeam(payload) {
  return this.publish("/team/activate", payload);
}

export { startTeam };
