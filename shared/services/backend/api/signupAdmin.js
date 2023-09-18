function signupAdmin({ username = "", email = "", password = "", role = "" }) {
  return this.publish("/admin/signup", {
    username,
    email,
    password,
    role,
  });
}

export { signupAdmin };
