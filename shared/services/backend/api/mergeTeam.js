/**
 * Successful team creation payload
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {string} message
 *
 * @example <caption>Example of a payload received at successful team merging </caption>
 *
 * result: "OK"
 * message: "successfully created team: <team_name>"
 */

/**
 * Failed team creation payload
 *
 * @typedef {Object} FailurePayload
 *
 * @example <caption> Example of a payload received at failed team merging </caption>
 *
 * result: "NOK"
 * message: "player with username: <team_player> has already merged into a team"
 *
 * result: "NOK"
 * message: "team with this name already exists"
 *
 * result: "NOK"
 * message: "player with username: <team_player> hasn't register his wristband"
 *
 * result: "NOK"
 * message: "at least one username doesn't exist"
 */

/**
 * Merge team
 *
 * @param {Object} payload
 * @param {string} payload.teamName
 * @param {Array<string>} payload.usernames
 * @returns {Promise} - SuccessPayload or FailurePayload
 * @throws {TimeoutError}
 */

function mergeTeam(payload) {
  return this.publish("/team/merge", payload);
}

function onMergeTeam(listener) {
  return this.subscribe("/team/merge", listener, { mode: "persistent" });
}

function onceMergeTeam(listener) {
  return this.subscribe("/team/merge", listener, { mode: "response" });
}

export { mergeTeam, onMergeTeam, onceMergeTeam };
