import { user } from "./user.js";
import { wristband } from "./wristband.js";

const player = {
  type: "object",
  properties: {
    username: user.properties.username,
    email: user.properties.email,
    password: user.properties.password,
    surname: {
      type: "string",
    },
    wristbandMerged: {
      type: "boolean",
    },
    wristband: {
      type: "object",
      properties: {
        wristbandNumber: wristband.properties.wristbandNumber,
        wristbandColor: wristband.properties.wristbandColor,
        active: wristband.properties.active,
      },
    },
  },
};

export { player };
