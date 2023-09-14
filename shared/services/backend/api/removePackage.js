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
 * @param {number} payload.packageId
 *
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 */
function removePackage(payload) {
  return this.publish("/team/package/delete", payload);
}

function onRemovePackage(listener) {
  return this.subscribe("/team/package/delete", listener, {
    mode: "persistent",
  });
}

function onceRemovePackage(listener) {
  return this.subscribe("/team/package/delete", listener, { mode: "response" });
}

export { removePackage, onRemovePackage, onceRemovePackage };
