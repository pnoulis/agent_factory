function deregisterCashier({ timestamp = Date.now(), username, userId } = {}) {
  return this.mqtt.publish("cashier/deregister", {
    timestamp,
    username,
    userId,
  });
}

export { deregisterCashier };
