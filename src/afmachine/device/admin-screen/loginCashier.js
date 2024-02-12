function loginCashier({ username, password } = {}) {
  return this.mqtt.publish("cashier/login", { username, password });
}

export { loginCashier };
