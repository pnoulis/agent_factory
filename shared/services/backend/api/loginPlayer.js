/**
 * Successful player login payload.
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * BackendPlayer
 */

/**
 * Failed player login payload.
 *
 * @typedef {Object} FailurePayload
 * @property {string} result - NOK
 * @property {string} [message] - The cause of failure in case of a NOT validation error.
 * @property {Object.<string,*>} validationErrors
 *
 * @example <caption>Example of a payload received at failed player login </caption>
 *
 * result: "NOK"
 * message: 'Unrecognized field email'
 *
 */

/**
 * Login player
 *
 * @param {Object} player
 * @param {string} player.username
 * @param {string} [player.password=""]
 *
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 *
 **/
function loginPlayer(player) {
  return this.publish("/player/login", player);
}

export { loginPlayer };
