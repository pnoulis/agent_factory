function loginAdmin({ username = "", password = "" }) {
  return this.publish("/admin/login", {
    username,
    password,
  });
}

export { loginAdmin };
