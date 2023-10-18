function signupAdmin({ username = "", email = "", password = "", role = "" }) {
  return this.publish("/admin/signup", {
    username,
    email,
    password,
    role: ["ROLE_" + role],
  });
}

export { signupAdmin };
