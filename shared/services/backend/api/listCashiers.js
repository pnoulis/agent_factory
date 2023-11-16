function listCashiers() {
  return this.publish("/admin/list", { timestamp: Date.now() });
}

export { listCashiers };
