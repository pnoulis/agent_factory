import { ENVIRONMENT } from "../config.js";
import { getMqttClient } from "../clients/mqtt.js";
import { toServer } from "agent_factory.shared/backend_topics.js";

const mqttClientMockBackend = getMqttClient(ENVIRONMENT.MQTT_LOGIN_BACKEND_URL);
// sub - pub map
const SPMAP = new Map(
  toServer.map(({ sub, pub }) => [
    sub && sub.replace(/\$\{clientId\}/, ENVIRONMENT.BACKEND_MQTT_CLIENT_ID),
    pub && pub.replace(/\$\{clientId\}/, ENVIRONMENT.BACKEND_MQTT_CLIENT_ID),
  ]),
);

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
      mqttClientMockBackend.publish(nextPublisher.pub, JSON.stringify(payload));
    });
  },
  fail(withPayload) {
    NEXT_RESPONSE[0] = function (publish) {
      publish(
        withPayload || {
          result: "NOK",
          timestamp: 12345456789,
        },
      );
    };
  },
  succeed(withPayload) {
    NEXT_RESPONSE[0] = function (publish) {
      publish(
        withPayload || {
          result: "OK",
          timestamp: 12345456789,
        },
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
      console.log(`MOCK PUBLISHING AT ${pub}`);
      mqttClientMockBackend.publish(pub, JSON.stringify(payload));
    });
  } else {
    console.log('adding to publishers queue');
    mockBackendServer.publishersQueue.push({ pub, sub });
  }
}

// Subscribe to all client publishes
mqttClientMockBackend.on("connect", () => {
  console.log("Mock backend server connected!");
  for (const sub of SPMAP.keys()) {
    if (!sub) continue;
    mqttClientMockBackend.subscribe(sub, function (err) {
      if (err) {
        console.log(`error trying to subscribe to topic:${sub}`);
      } else {
        console.log(`listening to:${sub}`);
      }
    });
  }
});

// Intercept all message events
mqttClientMockBackend.on("message", function (sub, msg) {
  console.log(`MOCK RECEIVED REQUEST on ${sub}`);
  console.log(msg.toString());
  handleMessage(sub);
});

export { mockBackendServer };
