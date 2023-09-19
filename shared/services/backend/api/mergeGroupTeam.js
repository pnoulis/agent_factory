/**
 * Successful group party team creation payload.
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 **/

/**
 * Failed group party team creation payload.
 *
 * @typedef {Object} FailurePayload
 * @property {string} result - NOK
 **/

/**
 * Merge group party team.
 *
 * @param {Object} payload
 * @param {string} payload.teamName
 * @param {Array.<{username: string, wristbandNumber: number}>} payload.groupPlayers
 * @returns {Promise} response
 * @throws {TimeoutError}
 **/
function mergeGroupTeam(payload) {
  return this.publish("groupteam/merge", payload);
}

function onMergeGroupTeam(listener) {
  return this.subscribe("/groupteam/merge", listener, { mode: "persistent" });
}

function onceMergeGroupTeam(listener) {
  return this.subscribe("/groupteam/merge", listener, { mode: "response" });
}

export { mergeGroupTeam, onMergeGroupTeam, onceMergeGroupTeam };
