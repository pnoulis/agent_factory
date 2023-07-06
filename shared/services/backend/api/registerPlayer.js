/**
 * Successful player registration payload.

 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {Object} player
 * @property {string} player.name
 * @property {string} player.surname
 * @property {string} player.username
 * @property {string} player.email
 */

/**
 * Failed player registration payload.
 *
 * @typedef {Object} FailurePayload
 * @property {string} result - NOK
 * @property {string} [message] - The cause of failure in case of a NOT validation error.
 * @property {Object.<string,*>} validationErrors - In case of validation errors.
 */

/**
 * Register Player
 *
 * @param {Object} player
 * @param {string} player.username
 * @param {string} player.name
 * @param {string} player.email
 * @param {string} [player.password]
 *
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 */

function registerPlayer(player) {
  return this.publish("/player/register", player);
}

export { registerPlayer };
