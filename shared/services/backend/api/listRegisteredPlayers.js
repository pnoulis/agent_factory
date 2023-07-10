/**
 * Successful response
 */

/**
 * Failed response
 */

/**
 * List registered players
 *
 * @param {Object} payload
 * @param {number} payload.timestamp - Date.now()
 * @returns {Promise} response
 */
function listRegisteredPlayers(payload) {
  return this.publish("/players/list", payload);
}

export { listRegisteredPlayers };
