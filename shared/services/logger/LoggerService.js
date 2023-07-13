import Pino from "pino";
import { ENVIRONMENT } from "../../config.js";

function LoggerService(clientId, name) {
  return new Pino({
    level: ENVIRONMENT.LOGLEVEL,
    name: name,
    timestamp: Pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label, number) => ({ level: number }),
    },
    base: {
      mode: ENVIRONMENT.MODE,
      id: clientId,
    },
    browser: ENVIRONMENT.RUNTIME === "browser" ? { asObject: true } : undefined,
  });
}

export { LoggerService };
