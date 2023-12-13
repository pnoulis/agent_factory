import { detectRuntime, getEnvar } from "js_utils/environment";

const ENV = {
  RUNTIME: detectRuntime(),
};
const __getEnvar = getEnvar.bind(
  null,
  [
    typeof __STATIC_ENV__ === "object" ? __STATIC_ENV__ : null,
    globalThis.process?.env,
  ],
  ENV,
);

__getEnvar("MODE");
__getEnvar("NODE_ENV");
__getEnvar("LOGLEVEL");
__getEnvar("DEVICE_ID");
__getEnvar(
  ENV.RUNTIME === "browser"
    ? "AFADMIN_SERVER_URL_ORIGIN_WS"
    : "AFADMIN_SERVER_URL_ORIGIN",
  {
    rename: "AFADMIN_SERVER_URL",
  },
);

export { ENV };
