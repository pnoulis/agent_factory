import { detectRuntime, getEnvar } from "js_utils/environment";
import { toServer } from "agent_factory.shared/backend_topics.js";

let LIB_MQTT = undefined;
if (detectRuntime() === "node") {
  LIB_MQTT = await import("mqtt");
} else {
  LIB_MQTT = await import("precompiled-mqtt");
}

const BACKEND_URL = getEnvar("BACKEND_URL", true);

// mqtt client
const mqttClient = new LIB_MQTT.connect(BACKEND_URL);
mqttClient.once("connect", function () {
  console.log("Mock backend server connected");
});

// sub - pub map
const SPMAP = new Map(toServer.map(({ sub, pub }) => [sub, pub]));

const NEXT_RESPONSE = [
  function (publish) {
    publish({
      result: "OK",
      message: "MOCK_SERVER_UP",
    });
  },
];

// mock backend server
const mockBackendServer = {
  auto: true,
  publishersQueue: [],
  publish(n = 0) {
    const nextPublisher = mockBackendServer.publishersQueue[n];
    mockBackendServer.publishersQueue.splice(n, 1);
    NEXT_RESPONSE[0]((payload) => {
      console.log(`MOCK RESPONSE on ${nextPublisher.pub}`);
      console.log(payload);
      mqttClient.publish(nextPublisher.pub, JSON.stringify(payload));
    });
  },
  fail(withPayload) {
    NEXT_RESPONSE[0] = function (publish) {
      publish(
        withPayload || {
          result: "NOK",
          timestamp: 12345456789,
        }
      );
    };
  },
  succeed(withPayload) {
    NEXT_RESPONSE[0] = function (publish) {
      publish(
        withPayload || {
          result: "OK",
          timestamp: 12345456789,
        }
      );
    };
  },
  timeout(at) {
    NEXT_RESPONSE[0] = function (publish) {
      setTimeout(() => publish("timeout"), at || 5000);
    };
  },
};

function handleMessage(sub) {
  const pub = SPMAP.get(sub);
  if (mockBackendServer.auto) {
    NEXT_RESPONSE[0]((payload) => {
      console.log(`MOCK RESPONSE on ${pub}`);
      console.log(payload);
      mqttClient.publish(pub, JSON.stringify(payload));
    });
  } else {
    mockBackendServer.publishersQueue.push({ pub, sub });
  }
}

// Subscribe to all client publishes
for (const sub of SPMAP.keys()) {
  if (!sub) continue;
  mqttClient.subscribe(sub, function (err) {
    if (err) {
      console.log(`error trying to subscribe to topic:${sub}`);
    } else {
      console.log(`listening to:${sub}`);
    }
  });
}

// Intercept all message events
mqttClient.on("message", function (sub, msg) {
  console.log(`MOCK REQUEST on ${sub}`);
  console.log(msg.toString());
  handleMessage(sub);
});

export { mockBackendServer };
