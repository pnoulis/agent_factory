function registerPlayer({
  timestamp = Date.now(),
  username = "",
  surname = "",
  name = "",
  email = "",
  password = "",
} = {}) {
  return this.mqtt.publish("player/register", {
    timestamp,
    username,
    surname,
    name,
    email,
    password,
  });
}

export { registerPlayer };
