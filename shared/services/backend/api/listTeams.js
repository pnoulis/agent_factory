/**
 * Successful listing of available teams
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {Array} teams
 **/

/**
 * List available teams.
 *
 * @returns {Promise} response
 * @throws {TimeoutError}
 **/
function listTeams() {
  return this.publish("/teams/all");
}

export { listTeams };
