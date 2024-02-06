function registerPlayer({
  timestamp = Date.now(),
  username = "",
  surname = "",
  name = "",
  email = "",
  password = "",
} = {}) {
  return this.publish("player/register", {
    timestamp,
    username,
    surname,
    name,
    email,
    password,
  });
}

export { registerPlayer };
