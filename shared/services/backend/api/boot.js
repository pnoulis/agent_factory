/**
 * Successful client boot payload
 *
 * @typedef {Object} SuccessPayload
 * @property {string} result - OK
 * @property {string} deviceType
 * @property {string} roomName
 */

/**
 * Boot client
 *
 * The deviceId forms a segment of the topic prefix that represents a unique
 * channel of communication between the client and the backend server.
 *
 * @param {Object} clientInfo
 * @param {string} clientInfo.deviceId
 * @param {string} clientInfo.roomName
 * @param {string} clientInfo.deviceType
 *
 * @returns {Promise} - SuccessPayload
 * @throws {TimeoutError}
 */

function boot() {
  if (this.booted)
    return Promise.resolve({
      result: "OK",
      deviceId: this.id,
      roomName: this.roomName,
      deviceType: this.deviceType,
    });
  return this.proxy
    .publish("/boot", {
      deviceId: this.id,
      roomName: this.roomName,
      deviceType: this.deviceType,
    })
    .then((res) => {
      console.log({
        deviceId: this.id,
        roomName: this.roomName,
        deviceType: this.deviceType,

      })
      this.booted = true;
      return res;
    });
}

export { boot };
