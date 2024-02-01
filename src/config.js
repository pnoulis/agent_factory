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

__getEnvar("MODE", { required: true });
__getEnvar("NODE_ENV");
__getEnvar("LOGLEVEL");
__getEnvar("DEVICE_ID", { required: true });
__getEnvar("AFADMIN_SERVER_URL_ORIGIN_WS", {
  required: true,
  rename: "AFADMIN_SERVER_URL",
});
__getEnvar("AFADMIN_CLIENT_URL_PUBLIC_BASENAME", {
  rename: "BASENAME",
});
__getEnvar("AFADMIN_MYSQLDB_URL", { required: true });

export { ENV, __getEnvar };
