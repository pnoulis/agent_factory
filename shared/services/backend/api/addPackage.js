/**
 * Successful package addition payload
 *
 * @typedef {Object} SuccessPayload
 *
 */

/**
 * Failed package addition payload
 *
 * @typedef {Object} FailurePayload
 */

/**
 * Add package to team
 *
 * @param {Object} payload
 * @param {string} payload.teamName
 * @param {string} payload.name - The name of a registered package
 *
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 */

function addPackage(payload) {
  return this.publish("/team/package/add", payload);
}

export { addPackage };
