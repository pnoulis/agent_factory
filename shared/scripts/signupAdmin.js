#!/usr/bin/env node

/*
  This script is intended to be executed through a terminal.

  Example:

  node ./registerPlayer.js 1

  The script cannot accept a shebang '#!/usr/bin/env node' which it would allow
  for its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.

 */

const [, , username = "dummy"] = process.argv;

import { ENVIRONMENT } from "../config.js";
import { getMqttClientBackend } from "../clients/mqtt.node.js";
import { BackendService } from "../services/backend/BackendService.js";

const backendMqttClient = getMqttClientBackend();
backendMqttClient.once("connect", () => {
  console.log(`Mqtt client connected to ${backendMqttClient.options.href}`);
  const backend = new BackendService(
    backendMqttClient,
    ENVIRONMENT.BACKEND_MQTT_ROOM_NAME,
    ENVIRONMENT.BACKEND_MQTT_DEVICE_TYPE,
    ENVIRONMENT.BACKEND_MQTT_CLIENT_ID,
  );

  backend
    .signupAdmin({
      username,
      email: `${username}@gmail.com`,
      password: "123",
      role: ["ROLE_CASHIER"],
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
});
