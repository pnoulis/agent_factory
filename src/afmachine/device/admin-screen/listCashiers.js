function listCashiers({ timestamp = Date.now() } = {}) {
  return this.mqtt.publish("list/cashiers", { timestamp });
}

export { listCashiers };
