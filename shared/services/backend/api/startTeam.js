/**
 * Successful team start payload
 *
 * @typedef {Object} SuccessPayload
 * @property {string} Result - OK
 * @property {Object} team
 * @property {string} team.name
 * @property {number} team.totalPoints
 * @property {Object} currentRoster
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

function onStartTeam(listener) {
  return this.subscribe("/team/activate", listener, { mode: "persistent" });
}

function onceStartTeam(listener) {
  return this.subscribe("/team/activate", listener, { mode: "response" });
}

export { startTeam, onStartTeam, onceStartTeam };
