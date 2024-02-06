function registerCashier({
  username = "",
  email = "",
  password = "",
  role = "",
} = {}) {
  return this.publish("/cashier/register", {
    username,
    email,
    password,
    role,
  });
}

export { registerCashier };
