function loginCashier({ username, password } = {}) {
  return this.publish("cashier/login", { username, password });
}

export { loginCashier };
