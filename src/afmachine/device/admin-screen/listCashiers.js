function listCashiers({ timestamp = Date.now() } = {}) {
  return this.publish("list/cashiers", { timestamp });
}

export { listCashiers };
