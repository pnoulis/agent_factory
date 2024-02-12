function registerCashier({
  username = "",
  email = "",
  password = "",
  role = "",
} = {}) {
  return this.mqtt.publish("/cashier/register", {
    username,
    email,
    password,
    role,
  });
}

export { registerCashier };
