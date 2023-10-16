function wakeupDevice({ deviceId }) {
  return this.publish(
    "/devices/action",
    deviceId
      ? {
          timestamp: Date.now(),
          devicesAction: "WAKE_UP",
          deviceId,
        }
      : {
          timestamp: Date.now(),
          devicesAction: "WAKEUP_ALL",
          deviceId: "",
        },
  );
}

export { wakeupDevice };
