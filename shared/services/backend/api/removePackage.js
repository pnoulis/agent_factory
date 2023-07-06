/**
 * Successful package removal payload
 *
 * @typedef {Object} SuccessPayload
 */

/**
 * Failed package removal payload
 *
 * @typedef {Object} FailurePayload
 */

/**
 * Remove package from team
 *
 * @param {Object} payload
 * @param {string} payload.teamName
 * @param {number || string} payload.packageId
 *
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 */
function removePackage(payload) {
  return this.publish("/team/package/delete", payload);
}

export { removePackage };
