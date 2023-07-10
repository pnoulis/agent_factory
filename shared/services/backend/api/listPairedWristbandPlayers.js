/**
 * Successful response
 */

/**
 * Failed response
 */

/**
 * List wristband players
 *
 * Players who have paired a wristband ane are not part
 * of any merged team.
 *
 * @param {Object} payload
 * @param {number} payload.timestamp - Date.now()
 * @returns {Promise} response
 */
function listWristbandPlayers(payload) {
  return this.publish("/players/list/available", payload);
}

export { listWristbandPlayers };
