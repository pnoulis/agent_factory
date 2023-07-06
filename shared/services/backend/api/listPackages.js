/**
 * Successful listing of available packages
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {Array} packages
 **/

/**
 *  List available packages
 *
 * @returns {Promise} - SuccessPayload
 * @throws {TimeoutError}
 **/
function listPackages() {
  return this.publish("/packages/list");
}

export { listPackages };
