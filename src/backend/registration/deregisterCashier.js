function deregisterCashier({ timestamp = Date.now(), username, userId } = {}) {
  return this.publish("cashier/deregister", {
    timestamp,
    username,
    userId,
  });
}

export { deregisterCashier };
